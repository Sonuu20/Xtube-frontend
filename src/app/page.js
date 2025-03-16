import { MainLayout } from "@/components/layout/Main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Welcome to X-tube</h1>
          <p className="text-muted-foreground">
            Discover videos from creators around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border bg-card">
              <div className="aspect-video bg-muted"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">
                  Video Title {i + 1}
                </h3>
                <p className="text-sm text-muted-foreground">Channel Name</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>10K views</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
