import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const baseClass = "bg-surface-container-high relative overflow-hidden";
  const shimmerClass = "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-surface-container-highest/20 after:to-transparent";
  
  const variants = {
    circular: "rounded-full",
    rectangular: "rounded-xl",
    text: "rounded-md h-4 w-full",
  };

  return (
    <div className={`${baseClass} ${shimmerClass} ${variants[variant]} ${className}`} />
  );
};

export const SkeletonCard = ({ className = '', withHeader = true }) => (
  <div className={`card-elevated p-5 flex flex-col gap-4 ${className}`}>
    {withHeader && (
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4 h-5" />
          <Skeleton variant="text" className="w-1/2 h-3" />
        </div>
      </div>
    )}
    <div className="space-y-3 mt-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-5/6" />
      <Skeleton variant="text" className="w-4/6" />
    </div>
    <div className="mt-auto pt-4 flex gap-2">
      <Skeleton variant="rectangular" className="h-10 flex-1" />
      <Skeleton variant="rectangular" className="h-10 flex-1" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="card-elevated overflow-hidden">
    <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
      <Skeleton variant="text" className="w-48 h-6" />
      <Skeleton variant="rectangular" className="w-24 h-8" />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-surface-container border-b border-outline-variant/10">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-4">
                <Skeleton variant="text" className="w-20 h-4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c} className="p-4">
                  <Skeleton variant="text" className="w-full h-4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Skeleton;
