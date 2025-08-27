// utils/helpers.js
export const calculateCountdown = (endDate) => {
    const endTime = new Date(endDate).getTime();
    const now = new Date().getTime();
    const timeDiff = endTime - now;
  
    if (timeDiff < 0) return "Auction Ended";
  
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  