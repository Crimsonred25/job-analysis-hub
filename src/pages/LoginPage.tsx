import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import loginBg from "@/assets/login-bg.png";
import { LogIn, User, Lock, ArrowRight, ChartLine, FileSignature, Shield, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: "Login Failed", description: error.message, variant: "destructive" });
        } else {
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Account Created", description: "Please check your email to verify your account." });
          setIsLogin(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { icon: <ChartLine className="w-5 h-5" />, title: "IPAR", desc: "Performance management module for tracking individual accomplishments and targets." },
    { icon: <FileSignature className="w-5 h-5" />, title: "PNPKI Application", desc: "Manage PNPKI digital certificates for trusted transactions and authentication." },
    { icon: <Shield className="w-5 h-5" />, title: "CyberSecurity Response", desc: "Centralized platform for ticketing and monitoring cybersecurity incidents." },
    { icon: <Network className="w-5 h-5" />, title: "ISSP", desc: "Strategic tool for planning and monitoring IT projects and compliance." },
  ];

  return (
    <div className="h-screen w-full flex items-center justify-center p-0 md:p-6 lg:p-10 bg-gradient-to-br from-muted to-secondary">
      <div className="h-full w-full max-w-[1400px] flex flex-col md:flex-row bg-card md:rounded-2xl shadow-2xl overflow-hidden relative border border-border/60">
        {/* Left panel with background image */}
        <div className="hidden md:flex flex-col md:w-1/2 lg:w-3/5 h-full relative overflow-hidden bg-brand-dark">
          <img src={loginBg} alt="DOTr" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent h-full w-full" />
          <div className="relative z-10 w-full h-full flex flex-col justify-end p-10 lg:p-16 text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight mb-4 text-primary-foreground">
              Welcome to the<br />
              <span className="text-brand-300">HRDD Portal</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg font-light leading-relaxed max-w-xl mb-8">
              The HRDD portal is a comprehensive centralized hub providing seamless access to the complete catalog of training programs and developmental processes offered by the HRDD Learning and Development unit.
            </p>
            <button
              onClick={() => setShowInfo(true)}
              className="group bg-card text-brand-blue hover:bg-muted font-bold py-3.5 px-8 rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3 w-max"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right panel - Login or Info */}
        {!showInfo ? (
          <div className="flex flex-col flex-1 relative animate-slide-in">
            <div className="w-full max-w-md mx-auto mt-6 md:mt-10 lg:mt-16 mb-24 px-8 md:px-12 space-y-2">
              <div className="text-center space-y-2">
                <div className="w-28 h-28 mx-auto flex items-center justify-center mb-6">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Department_of_Transportation_%28Philippines%29.svg/330px-Department_of_Transportation_%28Philippines%29.svg.png"
                    alt="DOTr Logo"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  HRDD Portal {isLogin ? "Sign in" : "Sign up"}
                </h2>
                <p className="text-muted-foreground text-base font-medium mt-2">
                  {isLogin ? "Enter your credentials to access your dashboard" : "Create your account to get started"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                {!isLogin && (
                  <div className="space-y-1.5 text-left">
                    <label className="block text-sm font-semibold text-foreground">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="Enter Full Name"
                        className="input-glow block w-full pl-11 pr-4 py-4 border border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground text-foreground font-medium"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 text-left">
                  <label className="block text-sm font-semibold text-foreground">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter Email"
                      className="input-glow block w-full pl-11 pr-4 py-4 border border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground text-foreground font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-sm font-semibold text-foreground">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="input-glow block w-full pl-11 pr-4 py-4 border border-border rounded-xl bg-muted/50 focus:bg-card focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground text-foreground font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-brand-blue-light text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base flex justify-center items-center gap-2 mt-4 disabled:opacity-75"
                >
                  {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                  <LogIn className="w-4 h-4 ml-1" />
                </button>
              </form>

              <div className="text-center pt-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-center p-8 md:p-12 lg:p-14 bg-card animate-slide-in">
            <div className="w-full">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h2 className="text-2xl font-extrabold font-display text-foreground">Portal Services</h2>
                <button
                  onClick={() => setShowInfo(false)}
                  className="text-sm font-bold text-primary hover:text-brand-blue bg-accent hover:bg-accent/80 px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  ← Back
                </button>
              </div>
              <div className="space-y-4">
                {services.map((s) => (
                  <div key={s.title} className="flex items-start gap-5 p-5 border border-border hover:border-primary hover:shadow-md bg-card rounded-2xl transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="font-bold font-display text-foreground text-base">{s.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
