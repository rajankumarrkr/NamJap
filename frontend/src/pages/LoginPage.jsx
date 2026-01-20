import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import { FaPhoneAlt, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.mobile || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    if (formData.mobile.length !== 10) {
      setError('Mobile number must be 10 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        mobile: formData.mobile,
        password: formData.password,
      });

      login(response.data.user, response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-saffron-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-float">
          <div className="w-20 h-20 mx-auto mb-4 saffron-gradient rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
            <span className="text-4xl transform -rotate-12">🙏</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Radhe Counter
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Welcome back to your practice
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-[2.5rem] p-8 pb-10 shadow-2xl border border-white/50 dark:border-gray-700/50">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-xs font-medium animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Mobile Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaPhoneAlt className="text-gray-400 group-focus-within:text-saffron-500 transition-colors" />
                </div>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="00000 00000"
                  maxLength="10"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 dark:text-white transition-all text-sm font-semibold outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 group-focus-within:text-saffron-500 transition-colors" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 dark:text-white transition-all text-sm font-semibold outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full saffron-gradient hover:shadow-[0_10px_25px_rgba(249,115,22,0.4)] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <FaSignInAlt className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
              New here?{' '}
              <Link
                to="/register"
                className="text-saffron-600 dark:text-saffron-400 font-bold hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
