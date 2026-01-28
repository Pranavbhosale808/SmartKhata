import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import SkeletonCard from "./SkeletonCard";
import {
  FileText,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function OverviewStats({ loading, data }) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: "Total Bills",
      value: data.totalBills,
      icon: FileText,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Total Revenue",
      value: data.totalRevenue,
      prefix: "₹",
      icon: IndianRupee,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Pending Credit",
      value: data.pendingCredit,
      prefix: "₹",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      label: "Paid Bills",
      value: data.paidBills,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="rounded-2xl hover:shadow-md transition">
              <CardContent className="p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm text-black/60">{stat.label}</p>
                  <h2 className="text-xl font-bold text-black mt-1">
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={1.2}
                      prefix={stat.prefix || ""}
                    />
                  </h2>
                </div>

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
