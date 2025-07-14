
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Scale, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: Scale,
      content: [
        "By accessing and using Campus Connect, you accept and agree to be bound by these Terms of Service.",
        "These Terms apply to all users, including students, service providers, and partners.",
        "If you disagree with any part of these terms, you may not access the service.",
        "We reserve the right to update these terms at any time with notice to users."
      ]
    },
    {
      title: "2. User Accounts & Eligibility",
      icon: Users,
      content: [
        "You must be a current student, staff member, or approved partner of Meru University to use our services.",
        "You are responsible for maintaining the confidentiality of your account information.",
        "You must provide accurate, current, and complete information during registration.",
        "One account per person - sharing accounts is prohibited.",
        "You must notify us immediately of any unauthorized access to your account."
      ]
    },
    {
      title: "3. Service Usage",
      icon: FileText,
      content: [
        "Campus Connect serves as a platform connecting students with services and products.",
        "We do not own, sell, or directly provide the products/services listed on our platform.",
        "All transactions are between users and service providers/sellers.",
        "We facilitate connections but are not party to any agreements between users.",
        "Services are intended for personal, non-commercial use by students."
      ]
    },
    {
      title: "4. User Conduct",
      icon: AlertCircle,
      content: [
        "Users must conduct themselves respectfully and professionally at all times.",
        "Prohibited activities include: fraud, harassment, spam, illegal activities, and misrepresentation.",
        "Users must respect intellectual property rights and not infringe on copyrights.",
        "False or misleading information in listings or profiles is strictly prohibited.",
        "Users must comply with all applicable laws and university policies."
      ]
    },
    {
      title: "5. Payments & Transactions",
      icon: Scale,
      content: [
        "All payments are processed directly between buyers and sellers.",
        "Campus Connect may charge service fees for certain premium features.",
        "We are not responsible for payment disputes between users.",
        "Users are responsible for any taxes related to their transactions.",
        "Refund policies are determined by individual sellers, not Campus Connect."
      ]
    },
    {
      title: "6. Privacy & Data Protection",
      icon: Users,
      content: [
        "We collect and use personal information as described in our Privacy Policy.",
        "Users consent to the collection and use of their information for service provision.",
        "We implement reasonable security measures to protect user data.",
        "Users may request deletion of their personal data subject to legal requirements.",
        "We do not sell personal information to third parties."
      ]
    },
    {
      title: "7. Limitation of Liability",
      icon: AlertCircle,
      content: [
        "Campus Connect is provided 'as is' without warranties of any kind.",
        "We are not liable for damages arising from service use or transactions.",
        "Our liability is limited to the maximum extent permitted by law.",
        "Users engage with third-party providers at their own risk.",
        "We are not responsible for the quality, safety, or legality of items/services listed."
      ]
    },
    {
      title: "8. Termination",
      icon: FileText,
      content: [
        "We may suspend or terminate accounts for violation of these terms.",
        "Users may delete their accounts at any time through their profile settings.",
        "Upon termination, users lose access to all services and stored data.",
        "Certain provisions of these terms survive account termination.",
        "We reserve the right to refuse service to anyone at our discretion."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Scale className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            Terms of Service ⚖️
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Our legal agreement with you as a Campus Connect user
          </p>
          <p className="text-white/80">
            Last updated: January 14, 2025
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Campus Connect! 👋</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service govern your use of Campus Connect, the student services platform 
                  for Meru University. By using our platform, you agree to these terms. Please read them 
                  carefully and reach out if you have any questions.
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
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Questions About Our Terms? 🤔</h3>
                <p className="text-white/90 mb-6">
                  We're here to help! If you have any questions about these Terms of Service, 
                  don't hesitate to reach out to our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <p><strong>Email:</strong> legal@campusconnect.co.ke</p>
                  <p><strong>WhatsApp:</strong> +254 790 767 347</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
