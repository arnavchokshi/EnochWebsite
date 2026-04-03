import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onIndexChange,
  skewAmount = 6,
  easing = 'elastic',
  children
}, ref) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const isAnimating = useRef(false);

  const swap = (direction = 'next') => {
    if (order.current.length < 2 || isAnimating.current) return;
    isAnimating.current = true;

    let front, rest;
    if (direction === 'next') {
      [front, ...rest] = order.current;
    } else {
      const last = order.current[order.current.length - 1];
      rest = order.current.slice(0, -1);
      front = last; // We'll animate the last one to the front
    }

    const elFront = refs[front].current;
    const tl = gsap.timeline({
      onComplete: () => {
        if (direction === 'next') {
          order.current = [...rest, front];
        } else {
          order.current = [front, ...rest];
        }
        isAnimating.current = false;
        onIndexChange?.(order.current[0]);
      }
    });
    tlRef.current = tl;

    if (direction === 'next') {
      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => gsap.set(elFront, { zIndex: backSlot.zIndex }),
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
    } else {
      // Previous animation: move last card down, promote others back, move last card to front
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      
      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => gsap.set(elFront, { zIndex: frontSlot.zIndex }),
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: frontSlot.x,
          y: frontSlot.y,
          z: frontSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
    }
  };

  useImperativeHandle(ref, () => ({
    next: () => {
      clearInterval(intervalRef.current);
      swap('next');
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    },
    prev: () => {
      clearInterval(intervalRef.current);
      swap('prev');
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    },
    goto: (targetIndex) => {
      if (isAnimating.current || order.current[0] === targetIndex) return;
      clearInterval(intervalRef.current);
      
      // Find how many steps forward to reach target
      const currentPos = order.current.indexOf(targetIndex);
      if (currentPos > 0) {
        // Just do a quick swap to get there
        const newOrder = [...order.current.slice(currentPos), ...order.current.slice(0, currentPos)];
        
        // Instantly place them
        const total = refs.length;
        newOrder.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          placeNow(el, slot, skewAmount);
        });
        
        order.current = newOrder;
        onIndexChange?.(order.current[0]);
      }
      
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    }
  }));

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
    onIndexChange?.(order.current[0]);

    // Initial delay before first swap
    const timeout = setTimeout(() => {
      swap('next');
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    }, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
        clearTimeout(timeout);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(() => swap('next'), delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
        clearTimeout(timeout);
      };
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            if (order.current[0] === i) {
              onCardClick?.(i);
            } else {
              // If clicking a background card, we could move to it, but for now just trigger next
              clearInterval(intervalRef.current);
              swap('next');
              intervalRef.current = window.setInterval(() => swap('next'), delay);
            }
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

export default CardSwap;