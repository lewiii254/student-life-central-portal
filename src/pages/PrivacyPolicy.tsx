
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Account Information: Name, email, phone number, and university details when you register",
        "Profile Data: Course information, year of study, and location preferences",
        "Transaction Data: Records of services used and interactions with service providers",
        "Communication Data: Messages sent through our platform and WhatsApp integration",
        "Usage Analytics: How you interact with our platform to improve user experience",
        "Device Information: Browser type, IP address, and device identifiers for security"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Settings,
      content: [
        "Provide and maintain Campus Connect services and features",
        "Connect you with relevant service providers and opportunities",
        "Process transactions and facilitate communications",
        "Send important updates about your account and services",
        "Improve our platform based on usage patterns and feedback",
        "Ensure platform security and prevent fraudulent activities",
        "Comply with legal obligations and university policies"
      ]
    },
    {
      title: "Information Sharing",
      icon: UserCheck,
      content: [
        "Service Providers: We share necessary details to facilitate services you request",
        "Partner Businesses: Contact information shared with verified campus partners only",
        "University Administration: Limited sharing as required by university policies",
        "Legal Requirements: We may disclose information when legally required",
        "Safety Purposes: Information shared to protect user safety and prevent harm",
        "We NEVER sell your personal information to third parties for marketing"
      ]
    },
    {
      title: "Data Security & Protection",
      icon: Lock,
      content: [
        "Industry-standard encryption for all data transmission and storage",
        "Regular security audits and vulnerability assessments",
        "Secure authentication systems with password protection",
        "Limited access to personal data on a need-to-know basis",
        "Regular backups with encrypted storage solutions",
        "Immediate notification procedures for any security incidents"
      ]
    },
    {
      title: "Your Privacy Rights",
      icon: Eye,
      content: [
        "Access: Request a copy of all personal data we hold about you",
        "Correction: Update or correct any inaccurate personal information",
        "Deletion: Request deletion of your personal data (subject to legal requirements)",
        "Portability: Export your data in a commonly used format",
        "Opt-out: Unsubscribe from marketing communications at any time",
        "Account Control: Delete your account and associated data through profile settings"
      ]
    },
    {
      title: "Cookies & Tracking",
      icon: Settings,
      content: [
        "Essential Cookies: Required for platform functionality and security",
        "Analytics Cookies: Help us understand how you use our platform",
        "Preference Cookies: Remember your settings and customizations",
        "You can control cookie settings through your browser preferences",
        "Disabling cookies may affect platform functionality",
        "We use Google Analytics for usage statistics (anonymized data)"
      ]
    },
    {
      title: "Data Retention",
      icon: Database,
      content: [
        "Account data retained while your account is active",
        "Transaction records kept for 7 years for legal compliance",
        "Communication logs retained for 2 years for support purposes",
        "Analytics data anonymized after 12 months",
        "Deleted account data removed within 90 days (except legal requirements)",
        "You can request immediate deletion of non-essential data"
      ]
    },
    {
      title: "Third-Party Services",
      icon: Shield,
      content: [
        "WhatsApp Business API for communication (Meta's privacy policy applies)",
        "Google Services for maps and authentication (Google's privacy policy applies)",
        "Payment processors for transaction handling (their privacy policies apply)",
        "Cloud storage providers for secure data backup",
        "We carefully vet all third-party services for privacy compliance",
        "Links to third-party privacy policies available upon request"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            Privacy Policy 🔒
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we protect and use your information.
          </p>
          <p className="text-white/80">
            Last updated: January 14, 2025
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy 🛡️</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Campus Connect, we understand that your privacy is fundamental to your trust in our platform. 
                  This Privacy Policy explains how we collect, use, protect, and respect your personal information.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We're committed to being transparent about our data practices and giving you control over your information. 
                  If you have any questions, our team is always ready to help.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Privacy Questions or Concerns? 📧</h3>
                <p className="text-white/90 mb-6">
                  We're committed to protecting your privacy. If you have questions about this policy 
                  or want to exercise your privacy rights, contact us anytime.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>privacy@campusconnect.co.ke</p>
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p>+254 790 767 347</p>
                  </div>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p>Within 48 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
