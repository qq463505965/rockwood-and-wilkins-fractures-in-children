x=c(2:16)
y1=c(500,1450,1050,1100,1700,2050,1200,2200,2500,2700,3100,1950,1500,1200,500)
y2=c(500,1300,1200,1450,2050,2300,1800,1800,1950,3000,3950,4800,4600,3700,2700)

plot(x,y1,type="o",ylim=c(0,6000),xlim=c(0,18),ylab="n/10^5/yr",bty="n",las=1,col="#cf0e25",pch=15,lwd=2,xaxt="n",yaxt="n",xlab="")
axis(1,at=seq(0,18,2),labels=c(0,2,4,6,8,10,12,14,16,18))
axis(2,at=seq(0,6000,1000),las=1)

abline(h=0)
abline(h=1000)
abline(h=2000)
abline(h=3000)
abline(h=4000)
abline(h=5000)
abline(h=6000)

par(new=TRUE)
plot(x,y2,type="o",ylim=c(0,6000),xlim=c(0,18),col="#446fb4",bty="n",xaxt="n",yaxt="n",xlab="",ylab="",pch=15,lwd=2)
