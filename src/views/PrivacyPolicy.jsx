import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, Bell, Globe, UserCheck, Scale, ExternalLink } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: 'definitions',
            title: '1. Definitions',
            icon: <FileText className="w-5 h-5" />,
            content: (
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                        <strong className="text-white">"Personal Data"</strong> means any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available with a body corporate, is capable of identifying such person.
                    </p>
                    <p>
                        <strong className="text-white">"Processing"</strong> in relation to personal data, means a wholly or partly automated operation or set of operations performed on personal data, and includes operations such as collection, recording, organisation, structuring, storage, adaptation, retrieval, use, alignment or combination, indexing, sharing, disclosure by transmission, dissemination or otherwise making available, restriction, erasure or destruction.
                    </p>
                </div>
            )
        },
        {
            id: 'collection',
            title: '2. Data Collection',
            icon: <Eye className="w-5 h-5" />,
            content: (
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>As part of our commitment to building your dream home, Built & Pulse collects personal information that you provide to us when you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Register for an account on our platform</li>
                        <li>Request a free consultation or estimate</li>
                        <li>Contact us via our website or social media</li>
                        <li>Interact with our construction experts or support teams</li>
                    </ul>
                    <p>This data includes but is not limited to: Name, Email Address, Phone Number, Location of Plot, and Construction Preferences.</p>
                </div>
            )
        },
        {
            id: 'purpose',
            title: '3. Purpose of Processing',
            icon: <Shield className="w-5 h-5" />,
            content: (
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>Built & Pulse processes your personal data for the following lawful purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide construction estimates and floor plans.</li>
                        <li>To manage your building project and provide real-time updates through our dashboard.</li>
                        <li>To communicate regarding service updates and policy changes.</li>
                        <li>To ensure compliance with Indian laws and regulations (DPDP Act 2023).</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'security',
            title: '4. Data Security',
            icon: <Lock className="w-5 h-5" />,
            content: (
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>We implement technical and organizational measures to ensure a level of security appropriate to the risk. Your data is protected through:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Encryption of data in transit and at rest.</li>
                        <li>Access controls governed by Role-Based Access Control (RBAC).</li>
                        <li>Regular security audits and vulnerability assessments.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'rights',
            title: "5. Data Principal's Rights",
            icon: <UserCheck className="w-5 h-5" />,
            content: (
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>Under the Digital Personal Data Protection Act, 2023, you have the following rights:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong className="text-white">Right to Access:</strong> Request a summary of personal data being processed.</li>
                        <li><strong className="text-white">Right to Correction/Erasure:</strong> Request the correction of incomplete or inaccurate data.</li>
                        <li><strong className="text-white">Right of Grievance Redressal:</strong> Contact our Data Protection Officer for any concerns.</li>
                        <li><strong className="text-white">Right to Nominate:</strong> Nominate another individual to exercise rights on your behalf in case of death or incapacity.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'retention',
            title: '6. Data Retention',
            icon: <Bell className="w-5 h-5" />,
            content: (
                <p className="text-slate-400 leading-relaxed">
                    Built & Pulse retains personal data only as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
            )
        },
        {
            id: 'compliance',
            title: '7. Compliance with Indian Law',
            icon: <Scale className="w-5 h-5" />,
            content: (
                <p className="text-slate-400 leading-relaxed">
                    This Privacy Policy is governed by and construed in accordance with the laws of India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023. Any disputes arising under this policy shall be subject to the exclusive jurisdiction of the courts in Nashik, Maharashtra.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] text-white selection:bg-orange-500/30">
            {/* Cinematic Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 blur-sm brightness-[0.3]"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1920&q=80")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/50 to-[#0F172A]" />

                <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider mb-2">
                        <Lock className="w-3 h-3" /> Security-First approach
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                        Privacy <span className="text-orange-500">&</span> Transparency
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        How Built & Pulse protects your data while building your legacy.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-24 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sticky Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-12 space-y-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Contents</h3>
                                <nav className="space-y-4">
                                    {sections.map(section => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="block text-sm font-medium text-slate-400 hover:text-orange-500 transition-colors"
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                        <Globe className="w-3 h-3" /> Last Updated: Feb 11, 2026
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Scale className="w-3 h-3" /> DPDP Act Compliant
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                                <h4 className="text-sm font-bold text-orange-500 mb-2">Need Clarification?</h4>
                                <p className="text-xs text-slate-400 mb-4 line-relaxed">
                                    Our Data Protection Officer is available to answer any questions about your information.
                                </p>
                                <a href="mailto:privacy@builtpulse.com" className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-orange-500 transition-colors">
                                    Contact DPO <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Content Card */}
                    <main className="lg:col-span-9">
                        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 md:p-14 shadow-2xl space-y-16">
                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl text-slate-300 leading-relaxed font-light italic">
                                    "Built & Pulse is committed to the highest standards of data protection. This policy outlines how we handle your personal information in accordance with the Digital Personal Data Protection Act, 2023."
                                </p>
                            </div>

                            {sections.map((section, index) => (
                                <section key={section.id} id={section.id} className="scroll-mt-12 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                                    </div>
                                    <div className="pl-0 md:pl-16">
                                        {section.content}
                                    </div>
                                    {index !== sections.length - 1 && (
                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent pt-16" />
                                    )}
                                </section>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900 shadow-xl border border-white/5 text-center">
                            <h3 className="text-xl font-bold mb-4">You're in Control</h3>
                            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed mb-8">
                                We believe your data belongs to you. If you'd like to exercise your rights or have your data deleted from our systems, simply click the button below.
                            </p>
                            <button className="px-8 py-3 rounded-xl bg-white text-[#0F172A] font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105">
                                Manage Data Preferences
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
