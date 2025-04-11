'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, UserCircle } from 'lucide-react';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple login that accepts any password
    if (email) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        email,
        role: isAdmin ? 'admin' : 'user'
      }));
      
      // Redirect based on role
      window.location.href = '/';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-secondary rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <UserCircle className="w-16 h-16 text-primary animate-pulse-subtle" />
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-8">
          {isAdmin ? 'Admin Login' : 'User Login'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-secondary-light border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="adminToggle"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded bg-secondary-light"
            />
            <label htmlFor="adminToggle" className="ml-2 block text-sm text-white">
              Login as Admin
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            <span>Login</span>
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-accent font-semibold transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;