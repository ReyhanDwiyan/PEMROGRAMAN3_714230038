import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../services/authService";

export function RegisterPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "user" // Default role
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.username) newErrors.username = "Username wajib diisi";
        if (!form.password) newErrors.password = "Password wajib diisi";
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Password tidak cocok";
        }
        if (!form.role) newErrors.role = "Role wajib dipilih";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        try {
            // Send registration with selected role
            await register(form.username, form.password, form.role);
            
            Swal.fire("Berhasil", "Registrasi berhasil! Silakan login", "success");
            navigate("/"); // Navigate back to login page
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Terjadi kesalahan saat registrasi";
            Swal.fire("Gagal", errorMessage, "error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-xl font-bold mb-6 text-center">Register</h2>
                
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
                
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                
                <div className="mb-4">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Konfirmasi Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <div className="mb-6">
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.role ? 'border-red-500' : ''}`}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Register
                </button>
                
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Sudah punya akun?</p>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}