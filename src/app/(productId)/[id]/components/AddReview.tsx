'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { Review } from '../../../../../pages/api/schema'
import { db } from '../../../../../pages/api/dpConfig'
import { Textarea } from '@/components/ui/textarea'
const initialReview = {
    name: '', rating: 5, review: '' 
}
const AddReview = ({refreshData,productId}:{refreshData: () => void,productId:any}) => {

    const [newReview, setNewReview] = useState(initialReview);
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const [isOpen, setIsOpen] = useState(false); 


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const result = await db
            .insert(Review)
            .values({
              name: newReview.name,
              rate: newReview.rating.toString(), 
              review: newReview.review,
              productId: productId.productId.id,
            })
            .returning({ insertedId: Review.id });
      
          if (result) {
            refreshData();
            setNewReview(initialReview);
            toast({
              title: "Your review has been posted",
              description: "Thank you for your feedback!",
              variant: "success"
            });
          } else {
            toast({
              title: "Error",
              description: "Something went wrong!",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error inserting review:", error);
          toast({
            title: "Error",
            description: "Something went wrong!",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setIsOpen(false); 
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className='bg-black text-white sm:py-4 sm:px-5 py-3 px-4 rounded-full'>Write a Review</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Your Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} id="name" value={newReview.name} className="col-span-3" required />
          </div>
          <div className="flex items-center gap-4">
          
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={newReview.rating || ''}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    required
                  />
          </div>
          <div className="flex items-center gap-4">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  required
                />
              </div>
        

          <Button onSubmit={handleSubmit} type="submit" disabled={loading}> 
          {loading ? "Submitting..." : "Submit"} </Button>
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddReview