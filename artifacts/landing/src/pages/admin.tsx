import { useState } from "react";
import { useListResponses, getListResponsesQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");

  const { data: responses, isError, error, isLoading } = useListResponses(
    { password: submittedPassword },
    { 
      query: { 
        enabled: !!submittedPassword, 
        retry: false,
        queryKey: getListResponsesQueryKey({ password: submittedPassword })
      } 
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setSubmittedPassword(password);
    }
  };

  if (!submittedPassword || isError) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50 dark:bg-[#18110B] p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter the admin password to view responses.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
                {isError && (
                  <p className="text-sm text-red-500">
                    {/* @ts-ignore - error format */}
                    {error?.status === 401 ? "Wrong password" : "An error occurred"}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full h-12" disabled={!password || isLoading}>
                {isLoading ? "Verifying..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-[#18110B] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-[#FEF7EB]">Survey Responses</h1>
            <p className="text-gray-500 dark:text-[#A89886]">
              {responses ? `Total: ${responses.length} responses` : 'Loading...'}
            </p>
          </div>
          <Button variant="outline" onClick={() => setSubmittedPassword("")}>
            Logout
          </Button>
        </div>

        <Card className="shadow-lg border-gray-200 dark:border-[#3A2A1A] dark:bg-[#261B12]">
          <div className="rounded-md border border-gray-200 dark:border-[#3A2A1A] overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-[#1f160e]">
                <TableRow className="border-gray-200 dark:border-[#3A2A1A]">
                  <TableHead className="w-[100px] text-gray-600 dark:text-[#A89886]">ID</TableHead>
                  <TableHead className="text-gray-600 dark:text-[#A89886]">Name</TableHead>
                  <TableHead className="text-gray-600 dark:text-[#A89886]">Phone</TableHead>
                  <TableHead className="text-gray-600 dark:text-[#A89886]">Email</TableHead>
                  <TableHead className="text-gray-600 dark:text-[#A89886]">Grade</TableHead>
                  <TableHead className="text-gray-600 dark:text-[#A89886]">City</TableHead>
                  <TableHead className="text-gray-600 dark:text-[#A89886]">School</TableHead>
                  <TableHead className="text-right text-gray-600 dark:text-[#A89886]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24 text-gray-500 dark:text-[#A89886]">
                      Loading responses...
                    </TableCell>
                  </TableRow>
                ) : !responses || responses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24 text-gray-500 dark:text-[#A89886]">
                      No responses yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  responses.map((response) => (
                    <TableRow key={response.id} className="border-gray-200 dark:border-[#3A2A1A] hover:bg-gray-50 dark:hover:bg-[#2c2016]">
                      <TableCell className="font-medium dark:text-[#E6D5C3]">{response.id}</TableCell>
                      <TableCell className="dark:text-[#FEF7EB]">{response.name}</TableCell>
                      <TableCell className="dark:text-[#E6D5C3]">{response.phone}</TableCell>
                      <TableCell className="dark:text-[#E6D5C3]">{response.email}</TableCell>
                      <TableCell className="dark:text-[#E6D5C3]">{response.grade}</TableCell>
                      <TableCell className="dark:text-[#E6D5C3]">{response.city}</TableCell>
                      <TableCell className="dark:text-[#E6D5C3]">{response.school}</TableCell>
                      <TableCell className="text-right dark:text-[#A89886]">
                        {format(new Date(response.createdAt), "PPp")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}