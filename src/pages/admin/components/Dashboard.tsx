import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BarChart, 
  MapPin, 
  ScrollText, 
  User, 
  MessageSquare, 
  Bell, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { QuestTask } from '@/redux/slices/questsSlice';

const Dashboard: React.FC = () => {
  const { language, t } = useLanguage();

  const dashboardItems = [
    { label: t('admin.totalUsers'), value: '4,528', icon: <User size={24} /> },
    { label: t('admin.totalQuests'), value: '1,245', icon: <Bell size={24} /> },
    { label: t('admin.totalStories'), value: '678', icon: <ScrollText size={24} /> },
    { label: t('admin.totalRoutes'), value: '342', icon: <MapPin size={24} /> },
    { label: t('admin.newFeedback'), value: '56', icon: <MessageSquare size={24} /> },
  ];

  const performanceData = [
    { label: t('admin.dailyVisits'), value: '3,456', trend: '+12%' },
    { label: t('admin.questCompletions'), value: '879', trend: '-5%' },
    { label: t('admin.storyViews'), value: '2,134', trend: '+8%' },
    { label: t('admin.routeStarts'), value: '567', trend: '+3%' },
  ];

  const recentTasks: QuestTask[] = [
    {
      id: '1',
      titleEn: 'Temple Visit',
      titleJp: '寺院訪問',
      descriptionEn: 'Visit the ancient temple and take a photo',
      descriptionJp: '古代寺院を訪れて写真を撮る',
      completed: true,
      type: 'photo_upload'
    },
    {
      id: '2',
      titleEn: 'Historical Quiz',
      titleJp: '歴史クイズ',
      descriptionEn: 'Answer questions about Kyoto\'s history',
      descriptionJp: '京都の歴史に関する質問に答える',
      completed: false,
      type: 'trivia'
    },
    {
      id: '3',
      titleEn: 'Sakura Season',
      titleJp: '桜のシーズン',
      descriptionEn: 'Share your experience of cherry blossom season',
      descriptionJp: '桜の季節の体験を共有する',
      completed: false,
      type: 'social_share'
    },
    {
      id: '4',
      titleEn: 'Local Cuisine',
      titleJp: '郷土料理',
      descriptionEn: 'Try and review a local delicacy',
      descriptionJp: '地元の珍味を試して感想を書く',
      completed: false,
      type: 'short_answer'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('admin.performanceOverview')}</CardTitle>
          <CardDescription>{t('admin.performanceDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.map((item, index) => (
              <div key={index} className="p-4 rounded-md bg-secondary/50">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.trend}</div>
              </div>
            ))}
          </div>
          <BarChart className="h-32 w-full mt-4" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('admin.recentTasks')}</CardTitle>
            <CardDescription>{t('admin.recentTasksDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.task')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      {language === 'en' ? task.titleEn : task.titleJp}
                    </TableCell>
                    <TableCell>
                      {task.completed ? (
                        <Badge variant="outline">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t('admin.completed')}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          {t('admin.pending')}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="p-4">
            <Button>{t('admin.viewAllTasks')}</Button>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('admin.userFeedback')}</CardTitle>
            <CardDescription>{t('admin.latestFeedback')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {t('admin.noFeedback')}
            </div>
          </CardContent>
          <div className="p-4">
            <Button>{t('admin.viewAllFeedback')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
