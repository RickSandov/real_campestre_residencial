import { IContactForm } from "interfaces";
import { transporter } from "server/lib/mails";

export const sendEmail = async (information: IContactForm) => {
  const mailContent = `
    ${mailHeader(information.name, true)}
    ${separator()}
    ${mailDescription(information)}
  `;

  const mail = mailContainer(mailContent);

  const mailerResponse = await transporter.sendMail({
    from: '"Real Campestre Residencial" <i.s.ricardo.sandoval@gmail.com>',
    // to: information.email,
    to: ["i.s.ricardo.sandoval@gmail.com", "alfabaluarte@gmail.com"],
    subject: `Solicitud de información (${information.name}: ${information.phoneNumber})`,
    html: mail,
  });
  //   console.log({ mailerResponse });
};

function mailContainer(content: string): string {
  return `<div
    style="max-width: 90%; width: 700px;  margin: 20px auto; @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'); font-family: 'Montserrat', sans-serif; font-size: 18px; color: #000;">${content}</div>`;
}

function mailHeader(clientName: string, admin?: boolean): string {
  return `
    <div style="width: 100%; min-height: 150px; padding: 30px 10px;" >
        <img src="https://www.realcampestredgo.com/assets/logotipo.png" alt="Real Campestre Residencial"
        style="height: 150px; max-width: 90%; max-height: 90%;  display: block; margin: 0 auto;">
        <h1 style="font-weight: 400; display: block;">${
          admin
            ? `¡Solicitan Información! Cliente: ${clientName.split(" ")[0]}`
            : `¡${clientName}, gracias por comunicarte con nosotros!`
        }</h1>
    </div>
  `;
}

function separator(): string {
  return `<hr style="width: 100%; background: #b0c774;">`;
}

function mailDescriptionItem(key: string, value: string, link = false): string {
  return `<p style="margin: 10px 0"><strong>${key}: </strong>${value}</p>`;
}

function mailDescription({
  name,
  message,
  phoneNumber,
  email,
}: IContactForm): string {
  return `
        ${mailDescriptionItem("Nombre del cliente", name)}
        ${mailDescriptionItem("Número de contacto", phoneNumber)}
        ${mailDescriptionItem("Correo electrónico", email)}
        ${message && mailDescriptionItem("Mensaje", message)}
    `;
}

function mailH2(text: string): string {
  return `<h2 style="font-weight: 400;">${text}</h2>`;
}
