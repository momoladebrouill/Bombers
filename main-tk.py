import table
import tkinter as tk
import random
from colorsys import hsv_to_rgb
from functools import partial
plato=table.Plato(10,10)
shownplato=table.Plato(10,10)
hsv=lambda  h: "#%02x%02x%02x" % tuple(int(c) for c in hsv_to_rgb(h,1,150))
for i in range(10):
    p=random.randrange(10),random.randrange(10)
    plato[p]=1
    shownplato[p]=1

euclide=[(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,0),(1,-1),(1,1)]
f=tk.Tk()
f.title('Demining by momoladebrouill')
buttons=[]

def changefor(e,a):
    W=f.winfo_width()
    H=f.winfo_height()
    on_click(e,a.num)
        
    
som=lambda a,b:(a[0]+b[0],a[1]+b[1])
nb_at= lambda pos:sum((shownplato[som(pos,i)]==1 for i in euclide))
def dig(pos):
    if 0<=pos[0]<=plato.w and 0<=pos[1]<=plato.h:
        if nb_at(pos)>=0:
            plato[pos]=2
        if nb_at(pos)==0:
            for d in euclide:
                    if plato[som(pos,d)]!=2 and plato[som(pos,d)]!=1:
                        dig(som(pos,d))
        
def on_click(pos,mode):
    print(pos)
    if mode==1:
        if plato[pos]==1:
            print("aaaah")
        else:
            dig(pos)
    else:
        plato[pos]=mode
    here=pos[:]
    for ind,but in enumerate(buttons):
        tuplepos=divmod(ind,plato.h)
        pos=(tuplepos[0],tuplepos[1])
        val=plato[pos]
        if val==0 or val==1:
            buttons[ind]['text']=""
            buttons[ind]["bg"]="black"
        elif val==2:
            n=nb_at(pos)
            if n==0 :
                buttons[ind]['text']=""
            else:
                buttons[ind]['text']=str(n)
                buttons[ind]["fg"]=hsv(n/8)
            buttons[ind]["bg"]="white"
        elif val==3:
            buttons[ind]["text"]=flag
            buttons[ind]["bg"]="white"
    

        
for x in range(plato.w):
    for y in range(plato.h):
        f.grid_columnconfigure(x, weight=1)
        f.grid_rowconfigure(y, weight=1)
        but=tk.Label(f,
                      text="",
                      font="Consolas 25",
                      width=2,
                      height=1
                      )
        but.bind('<Button-1>',partial(changefor,(x,y,1)))
        but.bind('<Button-3>',partial(changefor,(x,y,3)))
        but.grid(row=y,column=x,sticky='NESW')
        buttons.append(but)

#f.bind('<Button>',changefor)

flag="⚑"
bomb="ﬞ"
print(plato)
f.mainloop()