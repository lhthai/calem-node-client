import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

const AnalyticCard = ({ title, value, subtitle, icon, iconColor }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item sx={{ my: "auto" }}>
            <Avatar
              sx={{
                backgroundColor: iconColor,
                height: 48,
                width: 48,
                color: "#FFFFFF",
              }}
            >
              {icon}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
            {subtitle && (
              <Typography color="textSecondary" variant="body2">
                {subtitle}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticCard;
