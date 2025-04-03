
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { FileText, Shield, Info, Book } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("terms");

  const contentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <MainLayout>
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Legal Information</h1>
          <p className="text-muted-foreground">
            Please read our Terms of Service and Privacy Policy carefully
          </p>
        </motion.div>

        <Tabs defaultValue="terms" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Terms of Service</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Privacy Policy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms">
            <motion.div
              variants={contentAnimation}
              initial="hidden"
              animate="visible"
              className="space-y-8 py-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Terms of Service
                  </CardTitle>
                  <CardDescription>Last Updated: April 3, 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">1. Introduction</h3>
                    <p>
                      Welcome to Tourii. These Terms of Service govern your use of our website and mobile
                      application (collectively, the "Service"). By accessing or using our Service, you agree 
                      to be bound by these Terms. If you disagree with any part of the terms, you may not 
                      access the Service.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">2. Service Description</h3>
                    <p>
                      Tourii is a platform designed to encourage exploration of cultural locations through 
                      gamified quests, interactive stories, and curated tourist routes. Our Service offers 
                      digital badges, points, and virtual passport stamps as you complete activities.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">3. User Accounts</h3>
                    <p>
                      When you create an account with us, you must provide accurate and complete information. 
                      You are responsible for safeguarding the password and for all activities that occur under 
                      your account. You must notify us immediately of any breach of security or unauthorized 
                      use of your account.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">4. User Content</h3>
                    <p>
                      Our Service allows you to post, link, store, share and otherwise make available certain 
                      information, text, graphics, or other material. You are responsible for the content you 
                      post to the Service, including its legality, reliability, and appropriateness.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">5. Intellectual Property</h3>
                    <p>
                      The Service and its original content, features, and functionality are and will remain the 
                      exclusive property of Tourii and its licensors. The Service is protected by copyright, 
                      trademark, and other laws of both the United States and foreign countries.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">6. Limitation Of Liability</h3>
                    <p>
                      In no event shall Tourii, nor its directors, employees, partners, agents, suppliers, or 
                      affiliates, be liable for any indirect, incidental, special, consequential or punitive 
                      damages, including without limitation, loss of profits, data, use, goodwill, or other 
                      intangible losses, resulting from your access to or use of or inability to access or 
                      use the Service.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">7. Changes</h3>
                    <p>
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                      If a revision is material we will try to provide at least 30 days' notice prior to any new 
                      terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">8. Contact Us</h3>
                    <p>
                      If you have any questions about these Terms, please contact us at support@tourii.com.
                    </p>
                  </section>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="privacy">
            <motion.div
              variants={contentAnimation}
              initial="hidden"
              animate="visible"
              className="space-y-8 py-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy Policy
                  </CardTitle>
                  <CardDescription>Last Updated: April 3, 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">1. Information We Collect</h3>
                    <p>
                      We collect several different types of information for various purposes to provide and 
                      improve our Service to you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Personal Data:</strong> While using our Service, we may ask you to provide us 
                        with certain personally identifiable information that can be used to contact or identify 
                        you, such as your name, email address, and social media handles.
                      </li>
                      <li>
                        <strong>Usage Data:</strong> We may also collect information on how the Service is 
                        accessed and used, including your computer's Internet Protocol address, browser type, 
                        browser version, the pages of our Service that you visit, the time and date of your visit, 
                        the time spent on those pages, and other diagnostic data.
                      </li>
                      <li>
                        <strong>Location Data:</strong> We may use and store information about your location 
                        if you give us permission to do so. We use this data to provide features of our 
                        Service and to improve and customize our Service.
                      </li>
                    </ul>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">2. Use of Data</h3>
                    <p>
                      Tourii uses the collected data for various purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To provide and maintain our Service</li>
                      <li>To notify you about changes to our Service</li>
                      <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                      <li>To provide customer support</li>
                      <li>To gather analysis or valuable information so that we can improve our Service</li>
                      <li>To monitor the usage of our Service</li>
                      <li>To detect, prevent and address technical issues</li>
                    </ul>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">3. Data Security</h3>
                    <p>
                      The security of your data is important to us, but remember that no method of transmission 
                      over the Internet, or method of electronic storage is 100% secure. While we strive to use 
                      commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">4. Third-Party Services</h3>
                    <p>
                      Our Service may contain links to other sites that are not operated by us. If you click on 
                      a third party link, you will be directed to that third party's site. We strongly advise you 
                      to review the Privacy Policy of every site you visit. We have no control over and assume no 
                      responsibility for the content, privacy policies or practices of any third party sites or services.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">5. Children's Privacy</h3>
                    <p>
                      Our Service does not address anyone under the age of 13. We do not knowingly collect personally 
                      identifiable information from children under 13. If we discover that a child under 13 has provided 
                      us with personal information, we immediately delete this from our servers.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">6. Changes To This Privacy Policy</h3>
                    <p>
                      We may update our Privacy Policy from time to time. We will notify you of any changes by 
                      posting the new Privacy Policy on this page. You are advised to review this Privacy Policy 
                      periodically for any changes. Changes to this Privacy Policy are effective when they are 
                      posted on this page.
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-xl font-medium">7. Contact Us</h3>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at privacy@tourii.com.
                    </p>
                  </section>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Terms;
