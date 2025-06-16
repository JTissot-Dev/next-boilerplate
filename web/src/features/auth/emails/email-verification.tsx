interface EmailVerificationProps {
  userName?: string;
  verificationUrl: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  userName,
  verificationUrl,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#333', textAlign: 'center' }}>Vérifiez votre adresse email</h1>
    <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
      Bonjour {userName || 'utilisateur'},
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
      Merci de vous être inscrit ! Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email.
    </p>
    <div style={{ textAlign: 'center', margin: '30px 0' }}>
      <a
        href={verificationUrl}
        style={{
          backgroundColor: '#7521e8',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Vérifier mon email
      </a>
    </div>
    <p style={{ fontSize: '14px', color: '#888', textAlign: 'center' }}>
      Si vous n'arrivez pas à cliquer sur le bouton, copiez et collez ce lien dans votre navigateur :
    </p>
    <p style={{ fontSize: '14px', color: '#007cba', textAlign: 'center', wordBreak: 'break-all' }}>
      {verificationUrl}
    </p>
  </div>
);

export default EmailVerification;