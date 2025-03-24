import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addModelRoute, updateModelRoute, deleteModelRoute, ModelRoute } from '@/redux/slices/modelRoutesSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Map, Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ModelRoutesManagement = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.modelRoutes.items);
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<ModelRoute | null>(null);
  const [routeToDelete, setRouteToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
    distance: 0,
    difficulty: 'Easy' as 'Easy' | 'Moderate' | 'Hard',
    locations: '',
    tags: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: 'Easy' | 'Moderate' | 'Hard') => {
    setFormData({ ...formData, difficulty: value });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      thumbnail: '',
      duration: '',
      distance: 0,
      difficulty: 'Easy',
      locations: '',
      tags: '',
    });
    setCurrentRoute(null);
  };

  const handleAddEditDialogOpen = (route?: ModelRoute) => {
    if (route) {
      setCurrentRoute(route);
      setFormData({
        title: route.title,
        description: route.description,
        thumbnail: route.thumbnail,
        duration: route.duration,
        distance: route.distance,
        difficulty: route.difficulty,
        locations: route.locations.join(', '),
        tags: route.tags.join(', '),
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteDialogOpen = (id: string) => {
    setRouteToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setRouteToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const routeData: ModelRoute = {
      id: currentRoute ? currentRoute.id : `route-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail,
      duration: formData.duration,
      distance: Number(formData.distance),
      difficulty: formData.difficulty,
      locations: formData.locations.split(',').map(location => location.trim()).filter(location => location),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (currentRoute) {
      dispatch(updateModelRoute(routeData));
      toast({
        title: "Route updated",
        description: `"${routeData.title}" has been updated successfully.`,
      });
    } else {
      dispatch(addModelRoute(routeData));
      toast({
        title: "Route added",
        description: `"${routeData.title}" has been added successfully.`,
      });
    }

    handleDialogClose();
  };

  const handleDelete = () => {
    if (routeToDelete) {
      dispatch(deleteModelRoute(routeToDelete));
      toast({
        title: "Route deleted",
        description: "The route has been deleted successfully.",
        variant: "destructive",
      });
      handleDeleteDialogClose();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Map className="mr-2 h-7 w-7" />
            Model Routes Management
          </h1>
          <p className="text-muted-foreground">Manage travel routes and itineraries here.</p>
        </div>
        <Button onClick={() => handleAddEditDialogOpen()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Route
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No routes found. Create your first route.
                </TableCell>
              </TableRow>
            ) : (
              routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.title}</TableCell>
                  <TableCell>{route.duration}</TableCell>
                  <TableCell>{route.distance} km</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${route.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 
                      route.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400' : 
                      'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'}`}>
                      {route.difficulty}
                    </span>
                  </TableCell>
                  <TableCell>
                    {route.locations.length > 2 
                      ? `${route.locations.slice(0, 2).join(', ')} +${route.locations.length - 2}` 
                      : route.locations.join(', ')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleAddEditDialogOpen(route)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteDialogOpen(route.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Route Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentRoute ? 'Edit Route' : 'Add New Route'}</DialogTitle>
            <DialogDescription>
              {currentRoute 
                ? 'Update the route details below.' 
                : 'Fill in the details to create a new route.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Enter route title" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Enter route description" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input 
                id="thumbnail" 
                name="thumbnail" 
                value={formData.thumbnail} 
                onChange={handleInputChange} 
                placeholder="Enter image URL" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleInputChange} 
                  placeholder="e.g. 3 days" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input 
                  id="distance" 
                  name="distance" 
                  type="number" 
                  min="0"
                  step="0.1"
                  value={formData.distance} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={formData.difficulty}
                onValueChange={value => handleSelectChange(value as 'Easy' | 'Moderate' | 'Hard')}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locations">Locations (comma separated)</Label>
              <Textarea 
                id="locations" 
                name="locations" 
                value={formData.locations} 
                onChange={handleInputChange} 
                placeholder="e.g. Tokyo, Kyoto, Osaka" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleInputChange} 
                placeholder="e.g. Temples, Nature, Urban" 
                required 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit">
                {currentRoute ? 'Update Route' : 'Add Route'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Route</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this route? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleDeleteDialogClose}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelRoutesManagement;
