import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Support: React.FC = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully!');
    setTicketForm({ subject: '', category: '', priority: '', description: '' });
  };

  const faqData = [
    {
      question: "How do I add a new farmer to the system?",
      answer: "Navigate to the Farmer Management page and click the 'Add Farmer' button. Fill in the required information including name, location, contact details, and assign them to a warehouse."
    },
    {
      question: "How can I track vehicle locations in real-time?",
      answer: "Go to the Supply Chain Monitoring page where you'll find the live transport tracking map. Vehicle locations are updated every few minutes and show current status, route, and ETA."
    },
    {
      question: "What do the different alert severity levels mean?",
      answer: "Critical alerts require immediate attention (spoilage, system failures), High alerts need attention within hours (delays, stock issues), Medium alerts should be addressed within a day, and Low alerts are informational."
    },
    {
      question: "How do I export analytics reports?",
      answer: "In the Analytics & Reports section, use the Export CSV or Export PDF buttons. You can filter data by date range and region before exporting."
    },
    {
      question: "Can I customize the dashboard view?",
      answer: "Currently, the dashboard provides a standard view optimized for onion supply chain monitoring. Custom dashboard layouts may be available in future updates."
    },
    {
      question: "How do I reset a user's password?",
      answer: "In User Management, find the user account and click Edit. You can generate a new temporary password that the user will need to change on first login."
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support & Helpdesk</h1>
          <p className="text-muted-foreground mt-1">
            Get help with OnioTrack system and submit support requests
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Phone size={16} className="mr-2" />
            Call Support
          </Button>
          <Button variant="outline">
            <Mail size={16} className="mr-2" />
            Email Support
          </Button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-2">24/7 Emergency Support</p>
            <p className="font-medium text-foreground">+91-11-2345-6789</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-secondary-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Mail className="w-6 h-6 text-secondary-blue" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-2">Response within 4 hours</p>
            <p className="font-medium text-foreground">support@oniotrack.gov.in</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-success/10 p-3 rounded-full w-fit mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-2">Mon-Fri 9AM-6PM</p>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Ticket */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Submit Support Ticket</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of the issue"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={ticketForm.category}
                    onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account/Access</SelectItem>
                      <SelectItem value="data">Data Issue</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={ticketForm.priority}
                    onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue..."
                  rows={4}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                <Send size={16} className="mr-2" />
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg">
                  <AccordionTrigger className="px-4 text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <span className="font-medium text-foreground">API Services</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Operational</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <span className="font-medium text-foreground">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Operational</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <span className="font-medium text-foreground">Monitoring</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success">Operational</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;