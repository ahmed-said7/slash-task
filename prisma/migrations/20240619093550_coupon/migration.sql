-- CreateTable
CREATE TABLE "user_coupon" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "couponId" INTEGER NOT NULL,

    CONSTRAINT "user_coupon_pkey" PRIMARY KEY ("id")
);
