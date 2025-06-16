interface ResetPasswordProps {
    userName?: string;
    resetUrl: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
    userName,
    resetUrl,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', textAlign: 'center' }}>Réinitialisation de votre mot de passe</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
            Bonjour {userName || 'utilisateur'},
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
            Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe.
        </p>
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
                href={resetUrl}
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
                Réinitialiser mon mot de passe
            </a>
        </div>
        <p style={{ fontSize: '14px', color: '#888', textAlign: 'center' }}>
            Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
        </p>
        <p style={{ fontSize: '14px', color: '#888', textAlign: 'center' }}>
            Ce lien expire dans 24 heures.
        </p>
    </div>
);

export default ResetPassword;