import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { BusinessLaw } from "@/pages/practice/BusinessLaw";
import { PersonalInjury } from "@/pages/practice/PersonalInjury";
import { EstatePlanning } from "@/pages/practice/EstatePlanning";
import { PetTrustLawyerGeorgia } from "@/pages/blog/PetTrustLawyerGeorgia";
import { CarAccidentClaim } from "@/pages/blog/CarAccidentClaim";
import { FractionalGeneralCounsel } from "@/pages/blog/FractionalGeneralCounsel";
import { Admin } from "@/pages/Admin";
import { AdminLogin } from "@/pages/AdminLogin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice/business-law" element={<BusinessLaw />} />
          <Route path="/practice/personal-injury" element={<PersonalInjury />} />
          <Route path="/practice/estate-planning" element={<EstatePlanning />} />
          <Route path="/blog/pet-trust-lawyer-georgia" element={<PetTrustLawyerGeorgia />} />
          <Route path="/blog/car-accident-claim" element={<CarAccidentClaim />} />
          <Route path="/blog/fractional-general-counsel" element={<FractionalGeneralCounsel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
