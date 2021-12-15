

flag="⚑"
bomb="ﬞ"
class Plato():
    def __init__(self,width=7,height=6):
        self.val=0
        self.w=width
        self.h=height
        self.max=2**(self.w*self.h*2)
    def __setitem__(self,pos,val):
        pos=2*(pos[1]*self.w+pos[0])
        self.val &=~ (1<<pos) #ménage
        self.val &=~ (1<<(pos+1)) #
        self.val |= val<<pos #mettage
        

    def __getitem__(self,pos):
        pos=pos[0]*2,pos[1]*2
        if 0<=pos[0]<=self.w*2 and 0<=pos[1]<=self.h*2:
            return int(bool(self.val&(2**(pos[1]*self.w+pos[0]))))+\
                   2*int(bool(self.val&(2**(pos[1]*self.w+pos[0]+1))))
        else:
            return 0
    
    def __iter__(self):
        self.x,self.y=0,1
        self.part=1
        return self
    
    def __next__(self):
        self.x+=1
        self.part*=4
        if self.x >self.w:
            self.x=1
            self.y+=1
        if self.y>self.h:
            raise StopIteration
        return self.x-1,self.y-1,self[self.x-1,self.y-1]
    
    def __repr__(self):
        s=" |0 1 2 3 4 5 6\n"
        for y in range(self.h):
            s+=str(y)+"|"
            for x in range(self.w):
                val=self[x,y]
                s+=str("T" if val else " ")+" "
            s+="\n"
        return s
 
        
p=Plato()


