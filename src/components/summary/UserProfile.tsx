import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserProfileProps {
  profile: {
    details: {
      firstname: string;
      lastname: string;
    };
    plan: {
      planName: string;
    };
  };
}

export default function UserProfile({ profile }: UserProfileProps) {
  return (
    <Card className="col-span-1" variant="blur">
      <CardContent className="flex flex-col items-center gap-2 pt-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile.details.firstname} ${profile.details.lastname.split(" ")[0]}`}
          />
          <AvatarFallback>
            {profile.details.firstname[0]}
            {profile.details.lastname[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-center text-2xl font-bold">
            {profile.details.firstname}
          </h2>
          <p className="text-center text-sm font-medium">
            {profile.plan.planName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
