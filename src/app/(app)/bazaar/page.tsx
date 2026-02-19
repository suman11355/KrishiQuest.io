

import { KisanBazaar } from "@/components/krishi-quest/kisan-bazaar";

export default function BazaarPage() {
  return (
    <div className="container mx-auto px-4 pt-8">
        <div className="text-center">
            <h1 className="font-headline text-3xl font-bold text-primary mb-4">Kisan Bazaar</h1>
            <p className="text-muted-foreground mb-8">Use your hard-earned Kisan Koins to get valuable items.</p>
        </div>
        <KisanBazaar />
    </div>
  );
}
