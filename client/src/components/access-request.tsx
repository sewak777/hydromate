import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Clock, Check, X, AlertCircle, Mail, Send } from 'lucide-react';

export default function AccessRequest() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accessStatus, isLoading } = useQuery({
    queryKey: ['/api/access-control/status'],
    retry: false,
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/access-control/request', {
        method: 'POST',
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/access-control/status'] });
      toast({
        title: "Success",
        description: data.message || "Access request submitted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusDisplay = () => {
    if (!accessStatus) return null;

    switch (accessStatus.status) {
      case 'pending':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Pending Approval
              </Badge>
            </div>
            <p className="text-gray-600">
              Your access request is being reviewed by an administrator. You'll be notified when approved.
            </p>
            <div className="text-sm text-gray-500">
              Requested: {new Date(accessStatus.requestedAt).toLocaleDateString()}
            </div>
          </div>
        );
      
      case 'approved':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                Access Approved
              </Badge>
            </div>
            <p className="text-gray-600">
              Your access has been approved! You can now use the application.
            </p>
            <div className="text-sm text-gray-500">
              Approved: {new Date(accessStatus.approvedAt).toLocaleDateString()}
            </div>
            {accessStatus.notes && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-green-700">
                <strong>Admin Notes:</strong> {accessStatus.notes}
              </div>
            )}
          </div>
        );
      
      case 'rejected':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 px-4 py-2">
                <X className="w-4 h-4 mr-2" />
                Access Rejected
              </Badge>
            </div>
            <p className="text-gray-600">
              Your access request has been rejected. Please contact the administrator for more information.
            </p>
            {accessStatus.notes && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-red-700">
                <strong>Admin Notes:</strong> {accessStatus.notes}
              </div>
            )}
          </div>
        );
      
      case 'suspended':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 px-4 py-2">
                <AlertCircle className="w-4 h-4 mr-2" />
                Access Suspended
              </Badge>
            </div>
            <p className="text-gray-600">
              Your access has been suspended. Please contact the administrator.
            </p>
            {accessStatus.notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                <strong>Admin Notes:</strong> {accessStatus.notes}
              </div>
            )}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking access status...</p>
        </div>
      </div>
    );
  }

  // Show access request form if no status or needs to request
  if (!accessStatus || accessStatus.status === 'none') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Access Request Required
            </CardTitle>
            <CardDescription className="text-base">
              This application is currently in testing phase. Please request access to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg p-4 border border-cyan-200/50">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your request will be reviewed by an administrator</li>
                <li>• You'll be notified when your access is approved</li>
                <li>• This typically takes 1-2 business days</li>
              </ul>
            </div>
            
            <Button
              onClick={() => requestMutation.mutate()}
              disabled={requestMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl"
            >
              {requestMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Request Access
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show status for existing requests
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Access Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {getStatusDisplay()}
        </CardContent>
      </Card>
    </div>
  );
}