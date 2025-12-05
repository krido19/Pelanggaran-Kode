import React, { useState, useEffect } from 'react';
import { Save, Upload, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Image as ImageIcon, Type, Map as MapIcon, Info, MessageSquare, Users, FileText, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all transform translate-y-0 ${type === 'success' ? 'bg-teal-600 text-white' : 'bg-red-500 text-white'
            }`}>
            {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{message}</span>
        </div>
    );
};

// Collapsible Section Component
const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="text-teal-600" size={20} />}
                    <span className="font-bold text-gray-700">{title}</span>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>

            {isOpen && (
                <div className="p-6 border-t border-gray-100 animate-fadeIn">
                    {children}
                </div>
            )}
        </div>
    );
};

const ContentEditor = () => {
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState(null); // { message, type }
    const [editLanguage, setEditLanguage] = useState('id'); // 'id' or 'en'

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    // Helper to get localized key
    const getKey = (baseKey) => editLanguage === 'en' ? `${baseKey}_en` : baseKey;

    const handleSave = (baseKey, value) => {
        const storageKey = getKey(baseKey);
        localStorage.setItem(storageKey, value);
        showToast(`Changes saved for ${editLanguage === 'id' ? 'Indonesian' : 'English'}!`);
    };

    const getValue = (baseKey, defaultValue = '') => {
        const storageKey = getKey(baseKey);
        // Fallback to English key if ID is missing (not typical but safe) or just strict key
        return localStorage.getItem(storageKey) || defaultValue;
    };

    const handleImageUpload = async (e, storageKey, prefix) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${prefix}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('evidence')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('evidence')
                .getPublicUrl(filePath);

            if (data) {
                // Images are currently shared across languages, so we don't localize the key
                // Unless explicitly wanted. For now, assuming images are universal.
                // If specific images are needed per language, we would use getKey(storageKey)
                localStorage.setItem(storageKey, data.publicUrl);
                showToast('Image uploaded and saved!');
                // Force re-render to show new image (simple way)
                window.location.reload();
            }
        } catch (error) {
            showToast('Error uploading image: ' + error.message, 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Content Editor</h2>
                    <div className="text-sm text-gray-500">
                        Manage your website content in real-time
                    </div>
                </div>

                {/* Language Toggle */}
                <div className="bg-white p-1 rounded-lg border border-gray-200 flex items-center shadow-sm">
                    <button
                        onClick={() => setEditLanguage('id')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${editLanguage === 'id'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Indonesia (ID)
                    </button>
                    <button
                        onClick={() => setEditLanguage('en')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${editLanguage === 'en'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        English (EN)
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                <Globe className="text-blue-500 mt-0.5" size={20} />
                <div>
                    <h4 className="font-bold text-blue-800 text-sm">Editing Mode: {editLanguage === 'id' ? 'Indonesian' : 'English'}</h4>
                    <p className="text-sm text-blue-600">
                        You are currently editing the <strong>{editLanguage === 'id' ? 'Indonesian' : 'English'}</strong> version of the site content.
                        Switch using the toggle above to edit content for other languages. Images are shared across all languages.
                    </p>
                </div>
            </div>

            {/* Hero Section */}
            <CollapsibleSection title="Hero Section (Home)" icon={ImageIcon} defaultOpen={true}>
                <div className="space-y-8">
                    {/* Hero Image - Shared */}
                    <div className="border-b border-gray-100 pb-8">
                        <h3 className="font-bold text-gray-700 mb-4">Hero Background Image (Shared)</h3>
                        <div className="flex items-start gap-6">
                            <div className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative group">
                                {localStorage.getItem('heroImage') ? (
                                    <img
                                        src={localStorage.getItem('heroImage')}
                                        alt="Current Hero"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-xs">No custom image</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block w-full">
                                    <span className="sr-only">Choose profile photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'heroImage', 'hero')}
                                        disabled={uploading}
                                        className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-teal-50 file:text-teal-700
                                            hover:file:bg-teal-100
                                            cursor-pointer
                                        "
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x1080px. Max 2MB.</p>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('heroImage');
                                        showToast('Reset to default image');
                                        setTimeout(() => window.location.reload(), 1000);
                                    }}
                                    className="mt-4 text-sm text-red-500 hover:text-red-700 underline"
                                >
                                    Reset to Default
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Hero Text */}
                    <div>
                        <h3 className="font-bold text-gray-700 mb-4">Hero Text Content ({editLanguage.toUpperCase()})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                <input
                                    key={`subtitle-${editLanguage}`} // Force re-render on language switch
                                    type="text"
                                    defaultValue={getValue('hero_subtitle', "Platform Pelaporan")}
                                    onBlur={(e) => handleSave('hero_subtitle', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Version Badge</label>
                                <input
                                    key={`ver-${editLanguage}`}
                                    type="text"
                                    defaultValue={getValue('hero_ver', "Ver 2.0 (2024)")}
                                    onBlur={(e) => handleSave('hero_ver', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title (Use &lt;br/&gt; for line breaks)</label>
                                <input
                                    key={`title-${editLanguage}`}
                                    type="text"
                                    defaultValue={getValue('hero_title', "Pelanggaran Kode Internasional<br />Pemasaran Pengganti ASI")}
                                    onBlur={(e) => handleSave('hero_title', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    key={`desc-${editLanguage}`}
                                    defaultValue={getValue('hero_desc', "Mari bersama-sama melindungi anak-anak, ibu, keluarga dan kita semua dari praktik pemasaran susu formula dan semua produk pengganti ASI lainnya yang menyesatkan.")}
                                    onBlur={(e) => handleSave('hero_desc', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button</label>
                                <input
                                    key={`btn1-${editLanguage}`}
                                    type="text"
                                    defaultValue={getValue('hero_btn_primary', "Laporkan Pelanggaran")}
                                    onBlur={(e) => handleSave('hero_btn_primary', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button</label>
                                <input
                                    key={`btn2-${editLanguage}`}
                                    type="text"
                                    defaultValue={getValue('hero_btn_secondary', "Pelajari Selengkapnya")}
                                    onBlur={(e) => handleSave('hero_btn_secondary', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Map Statistics */}
            <CollapsibleSection title="Map Preview Statistics Labels" icon={MapIcon}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Note: Map Stats *values* are from stats data, usually not text content, 
                         but we might have labels here?
                         The original code edited 'stats_verified' etc. which seem to be NUMBERS/COUNTS
                         stored as strings. These likely shouldn't be localized per se, but shared.
                         However, if they are labels, then yes. 
                         Looking at the original code: defaultValue="1519" etc.
                         These seem to be overriding the COUNTS displayed on the simplified map/hero section if used there?
                         Wait, usually counts are same for all languages.
                         I will keep them shared for now.
                      */}
                    {['verified', 'unverified', 'rejected', 'total'].map((stat) => (
                        <div key={stat}>
                            <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{stat} Count (Shared)</label>
                            <input
                                type="text"
                                defaultValue={localStorage.getItem(`stats_${stat}`) || (stat === 'total' ? "1519" : stat === 'verified' ? "1425" : stat === 'rejected' ? "90" : "4")}
                                onBlur={(e) => {
                                    localStorage.setItem(`stats_${stat}`, e.target.value);
                                    showToast('Stats count updated');
                                }}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Info Section 1 */}
            <CollapsibleSection title="Info Section 1: What is the Code?" icon={Info}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            key={`info1_title-${editLanguage}`}
                            type="text"
                            defaultValue={getValue('info1_title', "What is International Code of Marketing of Breastmilk Substitutes?")}
                            onBlur={(e) => handleSave('info1_title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image (Shared)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'info1_image', 'info1')}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                            key={`info1_content-${editLanguage}`}
                            defaultValue={getValue('info1_content', "The Code is a global framework that regulates the marketing of breastmilk substitutes...")}
                            onBlur={(e) => handleSave('info1_content', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="5"
                        ></textarea>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Info Section 2 */}
            <CollapsibleSection title="Info Section 2: Why it is important?" icon={Info}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            key={`info2_title-${editLanguage}`}
                            type="text"
                            defaultValue={getValue('info2_title', "Why the Code is important?")}
                            onBlur={(e) => handleSave('info2_title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                            key={`info2_content-${editLanguage}`}
                            defaultValue={getValue('info2_content', "The Code is issued as a response...")}
                            onBlur={(e) => handleSave('info2_content', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="4"
                        ></textarea>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Info Section 3 */}
            <CollapsibleSection title="Info Section 3: WHA Resolutions" icon={FileText}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image (Shared)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'info3_bg', 'info3-bg')}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                key={`info3_title-${editLanguage}`}
                                type="text"
                                defaultValue={getValue('info3_title', "WHA Resolutions Code")}
                                onBlur={(e) => handleSave('info3_title', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <input
                                key={`info3_subtitle-${editLanguage}`}
                                type="text"
                                defaultValue={getValue('info3_subtitle', "Relevant WHA resolutions...")}
                                onBlur={(e) => handleSave('info3_subtitle', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resolutions List (One per line)</label>
                        <textarea
                            key={`info3_list-${editLanguage}`}
                            defaultValue={getValue('info3_list', "Concerning Free BMS...")}
                            onBlur={(e) => handleSave('info3_list', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm"
                            rows="8"
                        ></textarea>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Info Section 4 */}
            <CollapsibleSection title="Info Section 4: Chatbot Reporting" icon={MessageSquare}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Image (Shared)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'info4_image', 'info4-phone')}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                key={`info4_title-${editLanguage}`}
                                type="text"
                                defaultValue={getValue('info4_title', "Violations...")}
                                onBlur={(e) => handleSave('info4_title', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <input
                                key={`info4_subtitle-${editLanguage}`}
                                type="text"
                                defaultValue={getValue('info4_subtitle', "You can report")}
                                onBlur={(e) => handleSave('info4_subtitle', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <input
                                key={`info4_desc-${editLanguage}`}
                                type="text"
                                defaultValue={getValue('info4_desc', "Through the Chatbot")}
                                onBlur={(e) => handleSave('info4_desc', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Whatsapp Link (Shared)</label>
                            <input
                                type="text"
                                defaultValue={localStorage.getItem('info4_link') || "https://wa.me/6281316548773"}
                                onBlur={(e) => {
                                    localStorage.setItem('info4_link', e.target.value);
                                    showToast('Link updated');
                                }}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Visibility Settings - Shared */}
            <CollapsibleSection title="Section Visibility (Shared)" icon={Users}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-bold text-gray-800">Supported By Section</h4>
                            <p className="text-sm text-gray-500">Toggle visibility of the partner logos section</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked={localStorage.getItem('show_supporters') !== 'false'}
                                onChange={(e) => {
                                    localStorage.setItem('show_supporters', e.target.checked);
                                    showToast('Visibility settings updated');
                                }}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-bold text-gray-800">Articles Section</h4>
                            <p className="text-sm text-gray-500">Toggle visibility of the latest articles section</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked={localStorage.getItem('show_articles') !== 'false'}
                                onChange={(e) => {
                                    localStorage.setItem('show_articles', e.target.checked);
                                    showToast('Visibility settings updated');
                                }}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                    </div>
                </div>
            </CollapsibleSection>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ContentEditor;
