import React from 'react';
import { motion } from 'framer-motion';
import { User, Factory, Recycle, ArrowRight, CheckCircle2, FlaskConical, Trash2, Zap, Settings, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundSlideshow from '../components/BackgroundSlideshow';
import Bubbles from '../components/Bubbles';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'transparent', color: 'white', position: 'relative' }}>
            <Bubbles />
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '90vh',
                minHeight: '700px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 2rem',
                zIndex: 1
            }}>
                {/* Remove local Video Background to show global slideshow */}


                {/* Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(4, 30, 21, 0.8), rgba(4, 30, 21, 0.9))',
                    zIndex: 0
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ maxWidth: '1000px', zIndex: 1 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block',
                            padding: '0.6rem 2rem',
                            borderRadius: '99px',
                            background: 'rgba(0, 255, 157, 0.1)',
                            border: '1px solid rgba(0, 255, 157, 0.3)',
                            color: 'var(--color-brand-primary)',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            marginBottom: '2.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        Intelligence in Recycling
                    </motion.div>
                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                        fontWeight: '950',
                        marginBottom: '2rem',
                        lineHeight: '0.95',
                        letterSpacing: '-3px'
                    }}>
                        Waste <br /> To <span style={{ color: 'var(--color-brand-primary)' }}>Impact</span>
                    </h1>
                    <p style={{ fontSize: '1.4rem', marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.4', fontWeight: '400' }}>
                        The world's most advanced circular economy engine. We don't just manage waste; we engineer resources for a smarter, cleaner future.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.2rem', borderRadius: '15px', fontWeight: '800' }}>
                            Get Started Now <ArrowRight size={24} />
                        </Link>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.6 }}
                >
                    <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--color-brand-primary), transparent)' }} />
                </motion.div>
            </section>

            {/* Introduction Section */}
            <section style={{ padding: '10rem 2rem', background: 'var(--color-bg-primary)', position: 'relative', zIndex: 1 }}>
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.1' }}>
                            Advanced <br /> <span style={{ color: 'var(--color-brand-primary)' }}>Compliance</span> & Tracking
                        </h2>
                        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                            EcoConnect uses state-of-the-art logistics and material verification to ensure that every gram of waste reaches its optimal destiny. From residential collection to industrial processing, we provide end-to-end transparency.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Real-time Monitoring</h4>
                                <p style={{ fontSize: '0.9rem' }}>Track your materials from pickup to processing with live updates.</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>Full Compliance</h4>
                                <p style={{ fontSize: '0.9rem' }}>Digital manifests and environmental certificates provided instantly.</p>
                            </div>
                        </div>
                    </motion.div>
                    <div style={{
                        position: 'relative',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        height: '500px',
                        minWidth: '400px',
                        border: '2px solid rgba(0, 255, 157, 0.3)',
                        boxShadow: '0 20px 60px rgba(0, 255, 157, 0.2)',
                        backgroundColor: '#163B32'
                    }}>
                        <img
                            src="/compliance_image.jpg"
                            alt="Global Sustainability Network"
                            loading="eager"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                backgroundColor: '#163B32'
                            }}
                            onError={(e) => {
                                e.target.style.backgroundColor = '#163B32';
                                console.log('Image failed to load');
                            }}
                        />
                    </div>
                </div>
            </section>



            {/* Premium Categories Grid */}
            <section style={{ padding: '10rem 2rem', background: 'var(--color-bg-secondary)', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-2px' }}>Operational Hubs</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>Select your entry point into the circular economy.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                        <PremiumWasteCard
                            title="Sustainable Sellers"
                            icon={<Trash2 size={40} />}
                            image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
                            description="Monetize your waste and track your environmental contribution with our smart seller dashboard."
                            role="Generators"
                        />
                        <PremiumWasteCard
                            title="Industrial Buyers"
                            icon={<Zap size={40} />}
                            image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                            description="Sourcing verified secondary raw materials. High quality, competitive pricing, full compliance."
                            role="Manufacturers"
                        />
                        <PremiumWasteCard
                            title="Elite Recyclers"
                            icon={<FlaskConical size={40} />}
                            image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
                            description="Scale your facility operations with our unified management system and marketplace access."
                            role="Processors"
                        />
                    </div>
                </div>
            </section>


        </div>
    );
};

const PremiumWasteCard = ({ title, icon, image, description, role }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
                background: 'var(--color-bg-primary)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 255, 157, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                padding: '3rem'
            }}
        >
            <div className="icon-pulse" style={{
                background: 'var(--color-brand-primary)',
                padding: '1.5rem',
                borderRadius: '20px',
                color: '#041E15',
                boxShadow: '0 10px 40px rgba(0, 255, 157, 0.5)',
                transition: 'all 0.3s',
                width: 'fit-content',
                marginBottom: '2rem'
            }}>
                {icon}
            </div>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-accent)' }}>{role}</span>
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.25rem', fontWeight: '800', letterSpacing: '-1px' }}>{title}</h3>
                <p style={{ marginBottom: '3rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>{description}</p>
                <Link
                    to="/register"
                    style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        color: 'var(--color-brand-primary)',
                        fontWeight: '800',
                        fontSize: '1.1rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s'
                    }}
                >
                    Access Gateway <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

export default LandingPage;
