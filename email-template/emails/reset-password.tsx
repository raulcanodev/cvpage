import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import config from "@/config";

interface ResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  const { appName, domainName } = config;

  return (
    <Html>
      <Head />
      <Preview>{appName} reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/dropbox-logo.png`}
            width="40"
            height="33"
            alt="Dropbox"
          />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Someone recently requested a password change for your {appName} 
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              Please verify this email domain matches the domain of {domainName}. If not please ignore this email.
            </Text>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              If you cant click the button above, copy and paste the following link in your browser:
              {resetPasswordLink}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};