
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUsers } from '@/redux/slices/usersSlice';
import { setStories } from '@/redux/slices/storiesSlice';
import { setQuests } from '@/redux/slices/questsSlice';
import { setModelRoutes } from '@/redux/slices/modelRoutesSlice';
import { Users, ScrollText, Trophy, Map } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.items);
  const stories = useAppSelector((state) => state.stories.items);
  const quests = useAppSelector((state) => state.quests.items);
  const routes = useAppSelector((state) => state.modelRoutes.items);

  // Mock data for initial state
  useEffect(() => {
    // Mock users
    if (users.length === 0) {
      dispatch(setUsers([
        {
          id: '1',
          username: 'admin',
          email: 'admin@questify.com',
          avatar: 'https://ui-avatars.com/api/?name=Admin&background=random',
          authProvider: 'google',
          points: 1500,
          premium: true,
          createdAt: '2023-01-01',
          lastLogin: '2023-06-01',
          completedQuests: ['1', '2'],
          unlockedStories: ['1', '2'],
        },
        {
          id: '2',
          username: 'traveler_123',
          email: 'traveler@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Traveler&background=random',
          authProvider: 'discord',
          points: 750,
          premium: false,
          createdAt: '2023-02-15',
          lastLogin: '2023-05-20',
          completedQuests: ['1'],
          unlockedStories: ['1'],
        },
      ]));
    }

    // Mock stories from the existing stories component
    if (stories.length === 0) {
      dispatch(setStories([
        {
          id: '1',
          title: "The Legend of Kyoto's Hidden Temples",
          description: "Discover the ancient secrets of Kyoto's most mysterious shrines and the legends that surround them.",
          thumbnail: 'https://images.unsplash.com/photo-1598890777032-bde835a53f66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          isUnlocked: true,
          chapters: {
            total: 5,
            unlocked: 3,
          },
          relatedRouteId: 'kyoto-1',
          tags: ['Kyoto', 'Temples', 'Spiritual'],
        },
        {
          id: '2',
          title: 'Tokyo After Dark: Neon Dreams',
          description: "Experience the electric nightlife of Tokyo, from Shibuya's crossing to the hidden izakayas of Shinjuku.",
          thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80',
          isUnlocked: true,
          chapters: {
            total: 7,
            unlocked: 2,
          },
          relatedRouteId: 'tokyo-1',
          tags: ['Tokyo', 'Nightlife', 'Urban'],
        },
      ]));
    }

    // Mock quests
    if (quests.length === 0) {
      dispatch(setQuests([
        {
          id: '1',
          title: 'Kyoto Temple Explorer',
          description: 'Visit the most famous temples in Kyoto and discover their history.',
          thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          status: 'active',
          difficulty: 'Moderate',
          rewards: {
            points: 150,
            badges: ['Temple Explorer'],
          },
          tasks: [
            {
              id: 't1',
              title: 'Visit Kinkaku-ji (Golden Pavilion)',
              completed: true,
              location: {
                lat: 35.0394,
                lng: 135.7292,
                name: 'Kinkaku-ji',
              },
            },
            {
              id: 't2',
              title: 'Visit Fushimi Inari Shrine',
              completed: false,
              location: {
                lat: 34.9671,
                lng: 135.7726,
                name: 'Fushimi Inari Shrine',
              },
            },
          ],
          tags: ['Kyoto', 'Temples', 'Cultural'],
        },
        {
          id: '2',
          title: 'Tokyo Food Adventure',
          description: 'Taste the best food Tokyo has to offer, from street food to Michelin star restaurants.',
          thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          status: 'completed',
          difficulty: 'Easy',
          rewards: {
            points: 100,
            badges: ['Food Connoisseur'],
          },
          tasks: [
            {
              id: 't1',
              title: 'Try authentic ramen in Shinjuku',
              completed: true,
            },
            {
              id: 't2',
              title: 'Visit Tsukiji Outer Market',
              completed: true,
            },
          ],
          tags: ['Tokyo', 'Food', 'Urban'],
        },
      ]));
    }

    // Mock model routes
    if (routes.length === 0) {
      dispatch(setModelRoutes([
        {
          id: 'kyoto-1',
          title: 'Kyoto Classic Route',
          description: 'A 3-day route covering the most iconic spots in Kyoto.',
          thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          duration: '3 days',
          distance: 25,
          difficulty: 'Moderate',
          locations: ['Kinkaku-ji', 'Fushimi Inari Shrine', 'Arashiyama Bamboo Grove'],
          tags: ['Kyoto', 'Temples', 'Cultural'],
        },
        {
          id: 'tokyo-1',
          title: 'Tokyo Essentials',
          description: 'Experience the best of Tokyo in 5 days.',
          thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          duration: '5 days',
          distance: 40,
          difficulty: 'Easy',
          locations: ['Shinjuku', 'Shibuya', 'Akihabara', 'Asakusa', 'Odaiba'],
          tags: ['Tokyo', 'Urban', 'Shopping'],
        },
      ]));
    }
  }, [dispatch, users.length, stories.length, quests.length, routes.length]);

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      change: '+12% from last month',
    },
    {
      title: 'Stories',
      value: stories.length,
      icon: <ScrollText className="h-6 w-6 text-orange-500" />,
      change: '+5% from last month',
    },
    {
      title: 'Quests',
      value: quests.length,
      icon: <Trophy className="h-6 w-6 text-green-500" />,
      change: '+8% from last month',
    },
    {
      title: 'Model Routes',
      value: routes.length,
      icon: <Map className="h-6 w-6 text-purple-500" />,
      change: '+3% from last month',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Questify admin panel. Manage your app content here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest activities in the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New user registered</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Story "Tokyo After Dark" was updated</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New quest created</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system performance and reliability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">API Status</p>
                  <p className="text-sm text-muted-foreground">Response time: 85ms</p>
                </div>
                <div className="text-sm text-green-500 font-medium">Operational</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Cloudflare</p>
                  <p className="text-sm text-muted-foreground">DDoS Protection</p>
                </div>
                <div className="text-sm text-green-500 font-medium">Active</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Database</p>
                  <p className="text-sm text-muted-foreground">Read/Write operations</p>
                </div>
                <div className="text-sm text-green-500 font-medium">Normal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
