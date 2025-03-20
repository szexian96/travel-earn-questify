import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Upload, Camera, Share, CheckCircle, Loader2, QrCode, Check, Users, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export type TaskType = 
  | 'visit_location' 
  | 'answer_text' 
  | 'select_option' 
  | 'share_social' 
  | 'photo_upload' 
  | 'qr_scan'
  | 'group_activity';

interface BaseTaskProps {
  taskId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onComplete: (taskId: string, data?: any) => void;
}

interface VisitLocationTaskProps extends BaseTaskProps {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

export const VisitLocationTask: React.FC<VisitLocationTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  location,
  isCompleted,
  onComplete
}) => {
  const [isChecking, setIsChecking] = useState(false);
  
  const handleCheckIn = async () => {
    setIsChecking(true);
    // In a real app, you would check the user's location here
    setTimeout(() => {
      onComplete(taskId);
      setIsChecking(false);
    }, 2000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <MapPin className="h-4 w-4 mr-1.5 text-primary" />
              <span className="text-sm font-medium text-primary">Location Check-in</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-secondary/50 rounded-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-foreground" />
          <div className="flex-1 overflow-hidden">
            <p className="font-medium text-sm truncate">{location.name}</p>
            <p className="text-xs text-muted-foreground">
              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
          </div>
        </div>
        
        <div className="h-48 rounded-lg bg-muted mb-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">Map view unavailable in demo</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isChecking} 
            onClick={handleCheckIn} 
            className="w-full"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying your location...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Check in at this location
              </>
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Checked in successfully
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface TextAnswerTaskProps extends BaseTaskProps {
  placeholder?: string;
  minLength?: number;
}

export const TextAnswerTask: React.FC<TextAnswerTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  placeholder = "Type your answer here...", 
  minLength = 20,
  isCompleted,
  onComplete
}) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (answer.length < minLength) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete(taskId, { answer });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <span className="text-sm font-medium text-primary">Text Response</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <>
            <Textarea 
              placeholder={placeholder} 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-32 resize-none mb-2"
            />
            <p className="text-xs text-muted-foreground mb-2">
              Minimum {minLength} characters. You've typed {answer.length} characters.
            </p>
          </>
        ) : (
          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-sm italic">{answer}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isSubmitting || answer.length < minLength} 
            onClick={handleSubmit}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Answer"
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Answer submitted
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface SelectOptionTaskProps extends BaseTaskProps {
  options: { id: string; text: string }[];
}

export const SelectOptionTask: React.FC<SelectOptionTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  options,
  isCompleted,
  onComplete
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete(taskId, { selectedOption });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <span className="text-sm font-medium text-primary">Multiple Choice</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <RadioGroup 
            value={selectedOption || ''} 
            onValueChange={setSelectedOption}
            className="space-y-2"
          >
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer p-2 hover:bg-secondary/50 rounded-md">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-sm font-medium">Selected option:</p>
            <p className="text-sm">{options.find(opt => opt.id === selectedOption)?.text}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isSubmitting || !selectedOption} 
            onClick={handleSubmit}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Answer"
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Answer submitted
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface ShareSocialTaskProps extends BaseTaskProps {
  platform: string;
  shareText: string;
  hashtags: string[];
  mentions: string[];
}

export const ShareSocialTask: React.FC<ShareSocialTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  platform,
  shareText,
  hashtags,
  mentions,
  isCompleted,
  onComplete
}) => {
  const [isSharing, setIsSharing] = useState(false);
  
  const handleShare = async () => {
    setIsSharing(true);
    // In a real app, you would open the Twitter share dialog here
    setTimeout(() => {
      onComplete(taskId);
      setIsSharing(false);
    }, 2000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <Share className="h-4 w-4 mr-1.5 text-primary" />
              <span className="text-sm font-medium text-primary">{platform} Share</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm mb-2">{shareText}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {hashtags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800">
                #{tag}
              </Badge>
            ))}
            {mentions.map((mention, i) => (
              <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-800">
                @{mention}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isSharing} 
            onClick={handleShare} 
            className="w-full"
            variant="outline"
          >
            {isSharing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening share dialog...
              </>
            ) : (
              <>
                <Share className="mr-2 h-4 w-4" />
                Share on {platform}
              </>
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Shared successfully
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface PhotoUploadTaskProps extends BaseTaskProps {
  requirements?: string[];
}

export const PhotoUploadTask: React.FC<PhotoUploadTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  requirements = [],
  isCompleted,
  onComplete
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    // In a real app, you would upload the file here
    setTimeout(() => {
      onComplete(taskId, { imageUrl: previewUrl });
      setIsUploading(false);
    }, 2000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <Camera className="h-4 w-4 mr-1.5 text-primary" />
              <span className="text-sm font-medium text-primary">Photo Upload</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {requirements.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Requirements:</p>
            <ul className="space-y-2">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start">
                  <div className="mt-1 mr-2">
                    <Checkbox id={`req-${i}`} />
                  </div>
                  <Label htmlFor={`req-${i}`} className="text-sm">
                    {req}
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {!isCompleted ? (
          previewUrl ? (
            <div className="relative rounded-lg overflow-hidden bg-secondary mb-4">
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
              <button 
                className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/80 text-white hover:bg-foreground"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-muted rounded-lg p-8 text-center mb-4"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Upload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm font-medium">Click to upload a photo</p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG or HEIC up to 10MB
              </p>
              <Input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
          )
        ) : (
          <div className="rounded-lg overflow-hidden bg-secondary mb-4">
            <img src={previewUrl || ''} alt="Uploaded photo" className="w-full h-48 object-cover" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isUploading || !selectedFile} 
            onClick={handleUpload}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Photo"
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Photo uploaded
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface QrScanTaskProps extends BaseTaskProps {
  locationName: string;
}

export const QrScanTask: React.FC<QrScanTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  locationName,
  isCompleted,
  onComplete
}) => {
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = async () => {
    setIsScanning(true);
    // In a real app, you would open the camera to scan the QR code
    setTimeout(() => {
      onComplete(taskId);
      setIsScanning(false);
    }, 2000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <QrCode className="h-4 w-4 mr-1.5 text-primary" />
              <span className="text-sm font-medium text-primary">QR Code Scan</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-secondary/50 rounded-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-foreground" />
          <p className="font-medium text-sm">{locationName}</p>
        </div>
        
        {!isCompleted ? (
          <div className="flex flex-col items-center text-center p-6 border-2 border-dashed border-muted rounded-lg">
            <QrCode className="h-16 w-16 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium">Find the QR code at the location</p>
            <p className="text-xs text-muted-foreground mt-1">
              Scan the QR code to verify your presence
            </p>
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-700">QR code successfully scanned</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isScanning} 
            onClick={handleScan} 
            className="w-full"
          >
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <QrCode className="mr-2 h-4 w-4" />
                Open QR Scanner
              </>
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Verified presence
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface GroupActivityTaskProps extends BaseTaskProps {
  requiredMembers: number;
  currentMembers: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

export const GroupActivityTask: React.FC<GroupActivityTaskProps> = ({ 
  taskId, 
  title, 
  description, 
  requiredMembers,
  currentMembers,
  isCompleted,
  onComplete
}) => {
  const [isJoining, setIsJoining] = useState(false);
  
  const handleJoin = async () => {
    setIsJoining(true);
    // In a real app, you would join the group here
    setTimeout(() => {
      onComplete(taskId);
      setIsJoining(false);
    }, 2000);
  };
  
  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-500/20 bg-green-50/30' : 'hover:border-primary/20'} transition-all duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <Users className="h-4 w-4 mr-1.5 text-primary" />
              <span className="text-sm font-medium text-primary">Group Activity</span>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Group Members</p>
            <Badge variant="outline">
              {currentMembers.length}/{requiredMembers} joined
            </Badge>
          </div>
          
          <div className="flex -space-x-2 overflow-hidden p-2 bg-secondary/50 rounded-lg">
            {currentMembers.map((member) => (
              <div key={member.id} className="relative" title={member.name}>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background overflow-hidden">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-medium">{member.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
              </div>
            ))}
            
            {Array.from({ length: Math.max(0, requiredMembers - currentMembers.length) }).map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm">
            {isCompleted 
              ? "You've joined this group activity. Coordinate with other members to complete the task!" 
              : `This activity requires ${requiredMembers} people to participate together.`}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {!isCompleted ? (
          <Button 
            disabled={isJoining} 
            onClick={handleJoin} 
            className="w-full"
          >
            {isJoining ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining group...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Join Group Activity
              </>
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-green-50 text-green-700 border-green-200" disabled>
            <Check className="mr-2 h-4 w-4" />
            Joined group activity
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface TaskComponentProps {
  type: TaskType;
  taskData: any;
  onComplete: (taskId: string, data?: any) => void;
}

export const TaskComponent: React.FC<TaskComponentProps> = ({ type, taskData, onComplete }) => {
  switch (type) {
    case 'visit_location':
      return <VisitLocationTask {...taskData} onComplete={onComplete} />;
    case 'answer_text':
      return <TextAnswerTask {...taskData} onComplete={onComplete} />;
    case 'select_option':
      return <SelectOptionTask {...taskData} onComplete={onComplete} />;
    case 'share_social':
      return <ShareSocialTask {...taskData} onComplete={onComplete} />;
    case 'photo_upload':
      return <PhotoUploadTask {...taskData} onComplete={onComplete} />;
    case 'qr_scan':
      return <QrScanTask {...taskData} onComplete={onComplete} />;
    case 'group_activity':
      return <GroupActivityTask {...taskData} onComplete={onComplete} />;
    default:
      return <div>Unknown task type</div>;
  }
};
