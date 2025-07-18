import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Clock, AlertCircle, Users, UserCheck } from 'lucide-react';

interface AccessRequest {
  id: number;
  userId: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  requestedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  suspendedAt?: string;
  notes?: string;
}

export default function AdminPanel() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pendingRequests, isLoading: loadingPending } = useQuery({
    queryKey: ['/api/admin/access-requests'],
    retry: false,
  });

  const { data: allUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ['/api/admin/users'],
    retry: false,
  });

  const approveMutation = useMutation({
    mutationFn: async ({ userId, notes }: { userId: string; notes: string }) => {
      return await apiRequest(`/api/admin/access-requests/${userId}/approve`, {
        method: 'POST',
        body: { notes },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/access-requests'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success",
        description: "User access approved successfully",
      });
      setNotes('');
      setSelectedUser(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ userId, notes }: { userId: string; notes: string }) => {
      return await apiRequest(`/api/admin/access-requests/${userId}/reject`, {
        method: 'POST',
        body: { notes },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/access-requests'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success",
        description: "User access rejected",
      });
      setNotes('');
      setSelectedUser(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Check className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200"><AlertCircle className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (userId: string) => {
    approveMutation.mutate({ userId, notes });
  };

  const handleReject = (userId: string) => {
    rejectMutation.mutate({ userId, notes });
  };

  if (loadingPending || loadingUsers) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p className="text-gray-600">Manage user access requests and approvals</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Access Requests */}
        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardHeader className="flex flex-row items-center space-y-0 pb-3">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                Pending Requests
              </CardTitle>
              <CardDescription>
                Users waiting for approval
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              {pendingRequests?.length || 0}
            </Badge>
          </CardHeader>
          <CardContent>
            {pendingRequests?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests?.map((request: AccessRequest) => (
                  <div key={request.id} className="bg-white rounded-lg p-4 border border-cyan-200/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{request.email}</p>
                        <p className="text-sm text-gray-500">
                          Requested: {new Date(request.requestedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    {selectedUser === request.userId && (
                      <div className="mt-3 space-y-3">
                        <Textarea
                          placeholder="Add notes (optional)"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApprove(request.userId)}
                            disabled={approveMutation.isPending}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(request.userId)}
                            disabled={rejectMutation.isPending}
                            variant="destructive"
                            className="flex-1"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedUser(null);
                            setNotes('');
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                    
                    {selectedUser !== request.userId && (
                      <Button
                        onClick={() => setSelectedUser(request.userId)}
                        variant="outline"
                        className="w-full mt-3"
                      >
                        Review Request
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Users */}
        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardHeader className="flex flex-row items-center space-y-0 pb-3">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                All Users
              </CardTitle>
              <CardDescription>
                Complete user access overview
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {allUsers?.length || 0}
            </Badge>
          </CardHeader>
          <CardContent>
            {allUsers?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users found</p>
            ) : (
              <div className="space-y-3">
                {allUsers?.map((user: AccessRequest) => (
                  <div key={user.id} className="bg-white rounded-lg p-4 border border-cyan-200/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{user.email}</p>
                        <p className="text-sm text-gray-500">
                          {user.status === 'approved' && user.approvedAt && 
                            `Approved: ${new Date(user.approvedAt).toLocaleDateString()}`
                          }
                          {user.status === 'rejected' && user.rejectedAt && 
                            `Rejected: ${new Date(user.rejectedAt).toLocaleDateString()}`
                          }
                          {user.status === 'pending' && 
                            `Requested: ${new Date(user.requestedAt).toLocaleDateString()}`
                          }
                        </p>
                      </div>
                      {getStatusBadge(user.status)}
                    </div>
                    {user.notes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        <strong>Notes:</strong> {user.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {allUsers?.filter((u: AccessRequest) => u.status === 'approved').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allUsers?.filter((u: AccessRequest) => u.status === 'pending').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <X className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {allUsers?.filter((u: AccessRequest) => u.status === 'rejected').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {allUsers?.length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}