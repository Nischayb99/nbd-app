import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    bio: user?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        showNotification('success', 'Profile updated successfully');
        navigate('/profile');
      } else {
        showNotification('error', result.error || 'Failed to update profile');
      }
    } catch (error) {
      showNotification('error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#0b141a] pt-8 md:pt-0">
      <div className="w-full max-w-md bg-[#202c33] rounded-xl shadow-lg p-8 mx-2">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
          <p className="text-primary-200">Update your profile information</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar URL */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={formData.avatar || "/df-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
              onError={e => { e.target.src = "/df-avatar.png"; }}
            />
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Paste image URL (optional)"
              className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
            />
            <span className="text-xs text-primary-300">Leave blank for default avatar</span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-200 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-200 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="focus:ring-2 focus:ring-blue-400 w-1/2 py-2 px-4 rounded-lg border border-[#334155] text-white bg-[#2a3942] hover:bg-[#232e36] transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="focus:ring-2 focus:ring-blue-400 w-1/2 py-2 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;