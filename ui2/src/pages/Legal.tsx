import ReactMarkdown from 'react-markdown';

interface LegalPageProps {
  title: string;
  content: string;
}

export const LegalPage = ({ title, content }: LegalPageProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-5xl sm:text-6xl font-display font-bold uppercase tracking-tighter mb-12">
        {title}
      </h1>
      <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export const PRIVACY_POLICY = `
# Privacy Policy

Last updated: February 23, 2026

At Selvajaria Records, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.

## 1. Information We Collect
We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
* **Identity Data** includes first name, last name, username or similar identifier.
* **Contact Data** includes billing address, delivery address, email address and telephone numbers.
* **Financial Data** includes payment card details.
* **Transaction Data** includes details about payments to and from you and other details of products and services you have purchased from us.

## 2. How We Use Your Information
We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
* Where we need to perform the contract we are about to enter into or have entered into with you.
* Where it is necessary for our legitimate interests.
* Where we need to comply with a legal obligation.
`;

export const TERMS_OF_SERVICE = `
# Terms of Service

## 1. Terms
By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.

## 2. Use License
Permission is granted to temporarily download one copy of the materials (information or software) on Selvajaria Records's website for personal, non-commercial transitory viewing only.

## 3. Disclaimer
The materials on Selvajaria Records's website are provided "as is". Selvajaria Records makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
`;

export const SHIPPING_INFO = `
# Shipping Information

## Domestic Shipping (Germany)
* Standard Shipping: 2-4 business days - €5.00
* Express Shipping: 1-2 business days - €12.00

## International Shipping (EU)
* Standard Shipping: 5-10 business days - €10.00
* Express Shipping: 3-5 business days - €25.00

## International Shipping (Rest of World)
* Standard Shipping: 10-20 business days - €15.00
* Express Shipping: 5-7 business days - €40.00

*Note: Customers are responsible for any customs and import taxes that may apply. We are not responsible for delays due to customs.*
`;
