# from pydantic import EmailStr
# import resend
# from config.config import get_learnhouse_config


# def send_email(to: EmailStr, subject: str, body: str):
#     lh_config = get_learnhouse_config()
#     params = {
#         "from": "LearnHouse <" + lh_config.mailing_config.system_email_address + ">",
#         "to": [to],
#         "subject": subject,
#         "html": body,
#     }

#     resend.api_key = lh_config.mailing_config.resend_api_key
#     email = resend.Emails.send(params)

#     return email
        
from pydantic import EmailStr
from src.db.organizations import OrganizationRead
from src.db.users import UserRead
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.config import get_learnhouse_config
from fastapi import  HTTPException

def  send_email(to: EmailStr, subject: str, body: str):
    lh_config = get_learnhouse_config()

    # Create a multipart email
    msg = MIMEMultipart()
    msg['From'] = f"LearnHouse <{lh_config.mailing_config.system_email_address}>"
    msg['To'] = to
    msg['Subject'] = subject

    # Attach the HTML body
    msg.attach(MIMEText(body, 'html'))

   
    try:
        with smtplib.SMTP(lh_config.mailing_config.smtp_server, lh_config.mailing_config.smtp_port) as server:
            server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
            server.login(lh_config.mailing_config.system_email_address, lh_config.mailing_config.system_email_password)  # Login to the SMTP server
            response = server.send_message(msg)  # Send the email
            print("Email sent successfully!")
    except smtplib.SMTPException as e:
        # Handle SMTP-specific exceptions
        print(f"SMTP error occurred: {str(e)}")
    except Exception as e:
        # Handle general exceptions
        print(f"An error occurred: {str(e)}")
