"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, Linkedin, Github, Twitter, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { GlowingEffect } from '@/components/ui/glowing-effect';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setIsLoading(false);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/n-siva-shankar-684b3130a/', 'aria-label': 'LinkedIn Profile'},
    { name: 'GitHub', icon: Github, href: 'https://github.com/siva-630', 'aria-label': 'GitHub Profile'},
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yourusername', 'aria-label': 'Twitter Profile'},
    { name: 'Email', icon: Mail, href: 'mailto:nsiva1532@gmail.com', 'aria-label': 'Send an Email'},
  ];

  return (
    <section id="contact" className="relative w-full py-12 md:py-16 lg:py-24 bg-black text-gray-200">
      <GlowingEffect
        disabled={false}
        autoAnimate={false}
        spread={30}
        borderWidth={2}
        glow={true}
        proximity={50}
        inactiveZone={0.3}
        movementDuration={0.5}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
            style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }}
          >
            Get In Touch
          </h2>
          <p className="max-w-[700px] text-gray-300 text-base sm:text-xl/relaxed">
            Have a project in mind, a question, or just want to connect? Feel free to reach out!
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Card className="relative shadow-xl bg-card text-card-foreground">
              <GlowingEffect
                disabled={false}
                autoAnimate={false}
                spread={20}
                borderWidth={1.5}
                glow={true}
                blur={0}
                proximity={50}
                inactiveZone={0.3}
                movementDuration={0.5}
              />
              <CardHeader className="p-4">
                <CardTitle className="text-xl">Send a Message</CardTitle>
                <CardDescription className="text-gray-400">Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={field.name}>Full Name</FormLabel>
                          <FormControl>
                            <Input id={field.name} placeholder="siva" {...field} className="placeholder:text-gray-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={field.name}>Email Address</FormLabel>
                          <FormControl>
                            <Input id={field.name} type="email" placeholder="siva@gmail.com" {...field} className="placeholder:text-gray-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={field.name}>Your Message</FormLabel>
                          <FormControl>
                            <Textarea id={field.name} placeholder="Tell me about your project or inquiry..." rows={4} {...field} className="placeholder:text-gray-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-5 w-5" />
                      )}
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="space-y-8">
              <Card className="relative shadow-xl bg-card text-card-foreground">
                <GlowingEffect
                  disabled={false}
                  autoAnimate={false}
                  spread={20}
                  borderWidth={1.5}
                  glow={true}
                  blur={0}
                  proximity={50}
                  inactiveZone={0.3}
                  movementDuration={0.5}
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription className="text-gray-400">Other ways to connect with me.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <p className="text-gray-400">
                    Email: <a href="mailto:nsiva1532@gmail.com" style={{ color: `hsl(var(--portfolio-brand-hue, 230), 100%, 70%)` }} className="hover:underline">nsiva1532@gmail.com</a>
                  </p>
                  <p className="text-gray-400">
                    Location: India
                  </p>
                </CardContent>
              </Card>
              <Card className="relative shadow-xl bg-card text-card-foreground">
                <GlowingEffect
                  disabled={false}
                  autoAnimate={false}
                  spread={20}
                  borderWidth={1.5}
                  glow={true}
                  blur={0}
                  proximity={50}
                  inactiveZone={0.3}
                  movementDuration={0.5}
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">Follow Me</CardTitle>
                  <CardDescription className="text-gray-400">Connect with me on social media.</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <Button key={link.name} variant="outline" size="icon" asChild>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link['aria-label']}>
                          <link.icon className="h-5 w-5" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
