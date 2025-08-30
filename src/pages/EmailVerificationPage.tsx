import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import mangroveHero from '@/assets/mangrove-hero.jpg';

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const handleVerification = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setVerificationStatus('error');
        setErrorMessage('Invalid verification link. Please try again.');
        return;
      }

      try {
        const { error } = await verifyEmail(email, token);
        
        if (error) {
          setVerificationStatus('error');
          setErrorMessage(error.message);
        } else {
          setVerificationStatus('success');
          // Show success popup
          toast.success('Registration successful! Please log in to continue.');
          
          // Start countdown for auto-redirect
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/auth', { replace: true });
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        }
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleVerification();
  }, [searchParams, verifyEmail, navigate]);

  const handleContinue = () => {
    navigate('/auth', { replace: true });
  };

  const handleTryAgain = () => {
    navigate('/auth', { replace: true });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${mangroveHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card className="w-full max-w-md shadow-strong bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          {verificationStatus === 'verifying' && (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          )}
          {verificationStatus === 'success' && (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          )}
          {verificationStatus === 'error' && (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          )}
          
          <CardTitle className="text-2xl">
            {verificationStatus === 'verifying' && 'Verifying Your Email'}
            {verificationStatus === 'success' && 'Email Verified!'}
            {verificationStatus === 'error' && 'Verification Failed'}
          </CardTitle>
          
          <CardDescription>
            {verificationStatus === 'verifying' && 'Please wait while we verify your email address...'}
            {verificationStatus === 'success' && `Your email has been successfully verified. Redirecting to login in ${countdown} seconds...`}
            {verificationStatus === 'error' && 'We encountered an issue verifying your email address.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {verificationStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === 'success' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Welcome to Mangrove Guardian! Your account is now active and ready to use.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {verificationStatus === 'success' && (
              <Button 
                onClick={handleContinue} 
                className="w-full" 
                variant="default"
              >
                Continue to Login Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}

            {verificationStatus === 'error' && (
              <Button 
                onClick={handleTryAgain} 
                className="w-full" 
                variant="default"
              >
                Try Again
              </Button>
            )}

            <Button 
              onClick={() => navigate('/auth', { replace: true })} 
              className="w-full" 
              variant="outline"
            >
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
