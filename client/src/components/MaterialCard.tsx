import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface MaterialCardProps {
  title: string;
  type: "video" | "pdf" | "quiz";
  link: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ title, type, link }) => {
  const getMaterialIcon = () => {
    switch (type) {
      case "video":
        return "🎥 Video";
      case "pdf":
        return "📄 PDF";
      case "quiz":
        return "📝 Quiz";
      default:
        return "📁 Material";
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getMaterialIcon()}
        </Typography>
      </CardContent>
      <CardContent>
        <Button size="small" color="primary" href={link} target="_blank" rel="noopener noreferrer">
          Open
        </Button>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
