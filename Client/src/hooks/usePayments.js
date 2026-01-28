import { useEffect, useState } from "react";
import { getPayments } from "../api/paymentApi";

export default function usePayments() {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortDir, setSortDir] = useState("desc");

  const loadPayments = async (pageNo = 0, sort = sortDir) => {
    try {
      setLoading(true);

      const res = await getPayments({
        page: pageNo,
        size: 10,
        sortBy: "createdAt",
        sortDir: sort,
      });

      setPayments(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setPage(pageNo);
      setSortDir(sort);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments(0, "desc");
  }, []);

  return {
    payments,
    page,
    totalPages,
    loading,
    sortDir,
    loadPayments,
  };
}
