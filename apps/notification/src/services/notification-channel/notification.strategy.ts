export class NotificationStrategy {
  async sendEmail<T extends { firstName: string; companyName: string }>(data: T): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(
      `Subject: Happy Birthday ${data.firstName} 
       Content: ${data.companyName} is wishing you a happy birthday etc`,
    );
  }
}
