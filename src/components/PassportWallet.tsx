
import React from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { generateAppleWalletUrl, generatePassportQrContent } from '@/utils/walletPass';
import { HankoStamp } from './DigitalPassport';

interface PassportWalletProps {
  username: string;
  level: number;
  touriiPoints: number;
  stamps: HankoStamp[];
  passportId: string;
}

const PassportWallet: React.FC<PassportWalletProps> = ({
  username,
  level,
  touriiPoints,
  stamps,
  passportId,
}) => {
  const handleAddToWallet = () => {
    const walletUrl = generateAppleWalletUrl(username, level, stamps, passportId);
    window.open(walletUrl, '_blank');
    
    // In a real implementation, you might track this event
    console.log('User requested to add passport to wallet');
  };
  
  const qrContent = generatePassportQrContent(passportId);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="wallet-pass-container mt-6"
    >
      <Card className="overflow-hidden shadow-lg border-tourii-warm-grey-3 dark:border-tourii-charcoal/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-tourii-red" />
                Digital Passport Card
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                Add your Tourii Digital Passport to Apple Wallet for quick access.
                Show this at participating locations to collect stamps and earn points!
              </p>
              
              <div className="bg-tourii-warm-grey-2/50 dark:bg-tourii-charcoal/30 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="font-medium">Username:</span>
                  <span>{username}</span>
                  <span className="font-medium">Level:</span>
                  <span>{level}</span>
                  <span className="font-medium">Total Points:</span>
                  <span>{touriiPoints}</span>
                  <span className="font-medium">Stamps:</span>
                  <span>{stamps.length}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleAddToWallet}
                className="w-full mt-2 bg-black hover:bg-black/90 text-white"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Add to Apple Wallet
              </Button>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-[250px]">
                <AspectRatio ratio={1 / 1} className="bg-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <QRCode
                      value={qrContent}
                      size={200}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      level="M"
                      fgColor="#1F2937"
                    />
                  </div>
                </AspectRatio>
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Scan this QR code to verify your digital passport
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-tourii-warm-grey-2/30 dark:bg-tourii-charcoal/20 px-6 py-3 border-t border-tourii-warm-grey-3 dark:border-tourii-charcoal/30">
          <div className="flex items-center w-full justify-between text-xs text-muted-foreground">
            <span>Passport ID: {passportId}</span>
            <span>Tourii™ Digital Credential</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PassportWallet;
