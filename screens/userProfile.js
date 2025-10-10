import React, { useState, useEffect } from 'react';
import './UserProfile.css'; // <--- Import the dedicated CSS file

// --- Mock Data Setup ---
const MOCK_DB_PROFILE = {
  id: 'user_1a2b3c4d',
  username: 'GrievanceGuru',
  email: 'user.grievance@company.com',
  password: 'userpassword123',
  dob: '1990-01-01',
  address: '456 Resolution Road, Solution City, 10001',
  contact: '555-987-6543',
};

// --- Icon Mapping Helper (No change) ---
const getIconPlaceholder = (name) => {
  switch (name) {
    case 'User': return <span className="icon-placeholder">👤</span>;
    case 'Mail': return <span className="icon-placeholder">📧</span>;
    case 'Lock': return <span className="icon-placeholder">🔒</span>;
    case 'Calendar': return <span className="icon-placeholder">📅</span>;
    case 'MapPin': return <span className="icon-placeholder">📍</span>;
    case 'Phone': return <span className="icon-placeholder">📞</span>;
    case 'Edit': return <span className="icon-placeholder-sm">✎</span>;
    case 'X': return <span className="icon-placeholder-sm">✕</span>;
    case 'Save': return <span className="icon-placeholder-sm">✓</span>;
    default: return <span className="icon-placeholder">•</span>;
  }
};

// --- Helper Components ---

const ProfileAvatar = ({ username }) => {
  const initials = username.substring(0, 2).toUpperCase();
  return (
    <div className="profile-avatar">
      <span className="profile-initials">{initials}</span>
    </div>
  );
};

const Card = ({ title, iconName, children }) => {
  const Icon = getIconPlaceholder(iconName);
  return (
    <div className="profile-card">
      <div className="card-header">
        <div className="card-icon-wrapper">
            {Icon}
        </div>
        <h2 className="card-title">{title}</h2>
      </div>
      {children}
    </div>
  );
};

const ProfileField = ({ title, value, iconName, editable, isEditing, handleInputChange, isSecret = false, disabled = false }) => {
  const displayValue = isSecret ? value.replace(/./g, '•') : value;
  const Icon = getIconPlaceholder(iconName);
  
  const inputType = (editable === 'email' ? 'email' : 
                     editable === 'dob' ? 'date' : 
                     editable === 'contact' ? 'tel' : 
                     editable === 'password' ? 'password' : 'text');

  return (
    <div className="profile-field">
      {isEditing && !disabled ? (
        <div className="edit-mode-wrapper">
          <label className="input-label">{title}</label>
          <div className="input-field-container">
            <div className="input-icon-wrapper">
              <span className="icon-md">{Icon}</span>
            </div>
            <input
              type={inputType}
              value={value}
              onChange={(e) => handleInputChange(editable, e.target.value)}
              className="input-field"
              placeholder={`Enter ${title}...`}
            />
          </div>
        </div>
      ) : (
        <div className="display-mode-wrapper">
          <div className="display-title-row">
            <div className="display-icon-wrapper">{Icon}</div>
            <span className="display-title">{title}</span>
          </div>
          <p className="display-value">
            {displayValue}
          </p>
        </div>
      )}
    </div>
  );
};

const UserProfile = () => {
  const [profileData, setProfileData] = useState(MOCK_DB_PROFILE);
  const [tempProfileData, setTempProfileData] = useState(MOCK_DB_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileData(MOCK_DB_PROFILE);
    setTempProfileData(MOCK_DB_PROFILE);
  }, []);

  const handleInputChange = (key, value) => {
    setTempProfileData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    if (!tempProfileData.username || !tempProfileData.email || !tempProfileData.contact) {
      alert('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setProfileData(tempProfileData);
      setIsEditing(false);
      setIsLoading(false);
      alert('Success! Your profile has been updated.');
    }, 1500);
  };

  const handleCancel = () => {
    setTempProfileData(profileData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User logged out successfully.");
      alert('Logged Out: You have been successfully signed out.');
    }
  };

  return (
    <div className="profile-page-container">
      
      {/* 1. Header Section */}
      <div className="profile-header-background">
        <div className="profile-header-content">
             {/* Edit/Cancel Button */}
            <button
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                className={isEditing ? 'action-button edit-cancel-button is-editing' : 'action-button edit-cancel-button'}
                title={isEditing ? 'Cancel Edit' : 'Edit Profile'}
            >
                {isEditing ? (
                    <>
                        {getIconPlaceholder('X')}
                        <span className="button-text">Cancel</span>
                    </>
                ) : (
                    <>
                        {getIconPlaceholder('Edit')}
                        <span className="button-text">Edit Profile</span>
                    </>
                )}
            </button>
        </div>
      </div>

      <div className="profile-main-content">
        
        {/* 2. Profile Summary Card */}
        <div className="profile-summary-card">
          <ProfileAvatar username={profileData.username} />
          
          <div className="summary-text-area">
            <h1 className="summary-username">
              {profileData.username}
            </h1>
            <p className="summary-email">
              {profileData.email}
            </p>
            <p className="summary-member-since">
              Member since: {new Date(profileData.dob).getFullYear() - 1} 
            </p>
          </div>
        </div>

        {/* 3. Profile Details Section */}
        <div className="details-grid">
          <Card title="Account Details" iconName="User">
            <ProfileField 
              title="Username" 
              value={isEditing ? tempProfileData.username : profileData.username} 
              iconName="User"
              editable="username"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />

            <ProfileField 
              title="Email Address (Login ID)" 
              value={isEditing ? tempProfileData.email : profileData.email} 
              iconName="Mail"
              editable="email"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              disabled={true} 
            />
            
            <ProfileField 
              title="Password" 
              value={isEditing ? tempProfileData.password : profileData.password} 
              iconName="Lock"
              editable="password"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              isSecret={true}
            />

            <ProfileField 
              title="Date of Birth (DOB)" 
              value={isEditing ? tempProfileData.dob : profileData.dob} 
              iconName="Calendar"
              editable="dob"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </Card>

          <Card title="Contact Information" iconName="Phone">
            <ProfileField 
              title="Contact Number" 
              value={isEditing ? tempProfileData.contact : profileData.contact} 
              iconName="Phone"
              editable="contact"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            
            <ProfileField 
              title="Address" 
              value={isEditing ? tempProfileData.address : profileData.address} 
              iconName="MapPin"
              editable="address"
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </Card>
        </div>
        
        {/* 4. Action Buttons */}
        <div className="action-buttons-container">
          
          {/* Save Button in Edit Mode */}
          {isEditing && (
            <button 
              onClick={handleSave} 
              disabled={isLoading}
              className={`action-button save-button ${isLoading ? 'is-loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="4"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Saving Changes...
                </>
              ) : (
                <>
                  <span className="button-icon">{getIconPlaceholder('Save')}</span>
                  Save Changes
                </>
              )}
            </button>
          )}

          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="action-button logout-button"
          >
            <span className="button-icon">{getIconPlaceholder('Lock')}</span>
            Logout Securely
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;