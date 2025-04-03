import React, { useState } from 'react';
import { Trophy, Gift, Award, Star, PlusCircle, Edit, Trash2, ScrollText, Map, Wine, Sprout, Utensils, Coffee, Leaf, Bike } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample perks data - in a real app, this would come from an API
const initialPerks = [
  {
    id: '1',
    title: 'Premium Story Access',
    description: 'Get access to premium stories for 30 days',
    icon: 'ScrollText',
    pointsCost: 500,
    category: 'digital',
    active: true
  },
  {
    id: '2',
    title: 'Custom Avatar Frame',
    description: 'Unlock a special avatar frame for your profile',
    icon: 'Award',
    pointsCost: 300,
    category: 'digital',
    active: true
  },
  {
    id: '3',
    title: 'Route Creator Access',
    description: 'Create and publish your own custom routes',
    icon: 'Map',
    pointsCost: 800,
    category: 'digital',
    active: true
  },
  {
    id: '4',
    title: 'Double Points Weekend',
    description: 'Earn double points for all activities this weekend',
    icon: 'Star',
    pointsCost: 400,
    category: 'boost',
    active: false
  },
  {
    id: '5',
    title: 'Traditional Sake Set',
    description: 'Handcrafted ceramic sake set from a local brewery',
    icon: 'Wine',
    pointsCost: 2500,
    category: 'physical',
    active: true
  },
  {
    id: '6',
    title: 'Gourmet Mushroom Growing Kit',
    description: 'Grow your own shiitake and maitake mushrooms at home',
    icon: 'Sprout',
    pointsCost: 1800,
    category: 'physical',
    active: true
  }
];

const iconOptions = [
  { value: 'Award', label: 'Award' },
  { value: 'Gift', label: 'Gift' },
  { value: 'Star', label: 'Star' },
  { value: 'Trophy', label: 'Trophy' },
  { value: 'ScrollText', label: 'Scroll Text' },
  { value: 'Map', label: 'Map' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Sprout', label: 'Sprout' },
  { value: 'Utensils', label: 'Utensils' },
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Leaf', label: 'Leaf' },
  { value: 'Bike', label: 'Bike' }
];

const categoryOptions = [
  { value: 'digital', label: 'Digital' },
  { value: 'physical', label: 'Physical' },
  { value: 'experience', label: 'Experience' },
  { value: 'boost', label: 'Boost' }
];

const PerksManagement = () => {
  const { toast } = useToast();
  const [perks, setPerks] = useState(initialPerks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPerk, setCurrentPerk] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    pointsCost: '',
    category: '',
    active: true
  });

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Award': return <Award />;
      case 'Gift': return <Gift />;
      case 'Star': return <Star />;
      case 'Trophy': return <Trophy />;
      case 'ScrollText': return <ScrollText />;
      case 'Map': return <Map />;
      case 'Wine': return <Wine />;
      case 'Sprout': return <Sprout />;
      case 'Utensils': return <Utensils />;
      case 'Coffee': return <Coffee />;
      case 'Leaf': return <Leaf />;
      case 'Bike': return <Bike />;
      default: return <Gift />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numberValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [name]: numberValue }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      pointsCost: '',
      category: '',
      active: true
    });
  };

  const openEditDialog = (perk) => {
    setCurrentPerk(perk);
    setFormData({
      title: perk.title,
      description: perk.description,
      icon: perk.icon,
      pointsCost: String(perk.pointsCost),
      category: perk.category,
      active: perk.active
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (perk) => {
    setCurrentPerk(perk);
    setIsDeleteDialogOpen(true);
  };

  const handleAddPerk = () => {
    if (!formData.title || !formData.description || !formData.icon || !formData.pointsCost || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newPerk = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      pointsCost: Number(formData.pointsCost),
      category: formData.category,
      active: formData.active
    };

    setPerks([...perks, newPerk]);
    
    toast({
      title: "Success",
      description: "Perk has been added successfully",
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleUpdatePerk = () => {
    if (!formData.title || !formData.description || !formData.icon || !formData.pointsCost || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedPerks = perks.map(perk => {
      if (perk.id === currentPerk.id) {
        return {
          ...perk,
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          pointsCost: Number(formData.pointsCost),
          category: formData.category,
          active: formData.active
        };
      }
      return perk;
    });

    setPerks(updatedPerks);
    
    toast({
      title: "Success",
      description: "Perk has been updated successfully",
    });
    
    resetForm();
    setIsEditDialogOpen(false);
  };

  const handleDeletePerk = () => {
    const filteredPerks = perks.filter(perk => perk.id !== currentPerk.id);
    setPerks(filteredPerks);
    
    toast({
      title: "Success",
      description: "Perk has been deleted successfully",
    });
    
    setIsDeleteDialogOpen(false);
  };

  const togglePerkStatus = (id) => {
    const updatedPerks = perks.map(perk => {
      if (perk.id === id) {
        return { ...perk, active: !perk.active };
      }
      return perk;
    });
    
    setPerks(updatedPerks);
    
    toast({
      title: "Status Updated",
      description: "Perk status has been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Perks Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Perk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Perk</DialogTitle>
              <DialogDescription>
                Create a new perk for users to exchange their points for.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Premium Story Access"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Get access to premium stories for 30 days"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="icon">Icon</label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => handleSelectChange('icon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="category">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="pointsCost">Points Cost</label>
                <Input
                  id="pointsCost"
                  name="pointsCost"
                  value={formData.pointsCost}
                  onChange={handleNumberChange}
                  placeholder="500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="active">Active</label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddPerk}>Save Perk</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Perks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perks.map((perk) => (
                <TableRow key={perk.id}>
                  <TableCell className="font-medium">
                    <div className="text-primary">
                      {getIconComponent(perk.icon)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{perk.title}</div>
                    <div className="text-sm text-muted-foreground">{perk.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {perk.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {perk.pointsCost}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={perk.active ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePerkStatus(perk.id)}
                    >
                      {perk.active ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(perk)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(perk)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Perk Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Perk</DialogTitle>
            <DialogDescription>
              Update the details of this perk.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title">Title</label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Premium Story Access"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-description">Description</label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Get access to premium stories for 30 days"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="edit-icon">Icon</label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => handleSelectChange('icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-category">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-pointsCost">Points Cost</label>
              <Input
                id="edit-pointsCost"
                name="pointsCost"
                value={formData.pointsCost}
                onChange={handleNumberChange}
                placeholder="500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-active"
                name="active"
                checked={formData.active}
                onChange={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="edit-active">Active</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePerk}>Update Perk</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Perk</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this perk? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePerk}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerksManagement;
