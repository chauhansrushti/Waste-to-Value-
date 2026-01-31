import React from 'react';
import { Leaf, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'rgba(10, 45, 35, 0.4)', backdropFilter: 'blur(8px)', borderTop: '1px solid var(--color-bg-tertiary)', padding: '4rem 2rem 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.5rem', background: 'var(--color-brand-primary)', borderRadius: '8px' }}>
                                <Leaf size={20} color="#041E15" />
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>EcoConnect</span>
                        </div>
                        <p style={{ maxWidth: '300px', fontSize: '0.9rem' }}>
                            Empowering the circular economy through technology. We connect waste generators with recyclers to build a sustainable future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#" className="hover:text-brand">For Sellers</a></li>
                            <li><a href="#" className="hover:text-brand">For Buyers</a></li>
                            <li><a href="#" className="hover:text-brand">For Recyclers</a></li>
                            <li><a href="#" className="hover:text-brand">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#" className="hover:text-brand">About Us</a></li>
                            <li><a href="#" className="hover:text-brand">Careers</a></li>
                            <li><a href="#" className="hover:text-brand">Blog</a></li>
                            <li><a href="#" className="hover:text-brand">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>Stay Updated</h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="email" placeholder="Enter your email" style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--color-bg-tertiary)',
                                background: 'var(--color-bg-primary)',
                                color: 'white',
                                width: '100%'
                            }} />
                            <button className="btn btn-primary" style={{ padding: '0.5rem' }}>
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-bg-tertiary)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        © {new Date().getFullYear()} EcoConnect. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Twitter size={20} className="hover:text-brand cursor-pointer" />
                        <Github size={20} className="hover:text-brand cursor-pointer" />
                        <Linkedin size={20} className="hover:text-brand cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
