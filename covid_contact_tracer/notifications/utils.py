from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from decouple import config
import smtplib
 
def email_notification(locations):

    # setup the parameters for login
    password = config("EMAIL_PASSWORD")
    email = config("EMAIL")
    
    #create server
    server = smtplib.SMTP('smtp.gmail.com: 587')
    
    server.starttls()
    
    # Login Credentials for sending the mail
    server.login(email, password)
    
    # send the message via the server.
    for location in locations:

        # create message object instance
        msg = MIMEMultipart()
        message = ""

        # setup the parameters of the message
        msg['From'] = email
        msg['To'] = location.owner.email
        msg['Subject'] = "Contact Alert"

        # add in the message body
        msg.attach(MIMEText(message, 'plain'))

        # send
        server.sendmail(msg['From'], msg['To'], msg.as_string())
    
    server.quit()