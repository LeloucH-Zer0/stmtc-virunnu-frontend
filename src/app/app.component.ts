import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'q';
import { AppService } from './app.service';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastrService, private service : AppService) {}
  title = 'FirstAngularApp';
  itemCount = 2;
  timer = timer(2000, 5000);
  // mainContent;
  mainContent = [
    {
      category_name: "Snacks",
      items: [
        {
          item_name: "Snack1",
          count: 10,
          id: 1
        },
        {
          item_name: "Snack2",
          count: 20,
          id: 2
        },
        {
          item_name: "Snack3",
          count: 30,
          id: 3
        }
      ]
    },
    {
      category_name: "Starters",
      items: [
        {
          item_name: "Starter1",
          count: 11,
          id: 4
        },
        {
          item_name: "Starter2",
          count: 21,
          id: 5
        },
        {
          item_name: "Starter3",
          count: 31,
          id: 6
        }
      ]
    },
    {
      category_name: "Main Course",
      items: [
        {
          item_name: "Main Course 1",
          count: 12,
          id: 7
        },
        {
          item_name: "Main Course 2",
          count: 22,
          id: 8
        },
        {
          item_name: "Main Course 3",
          count: 32,
          id: 9
        },
      ]
    },
    {
      category_name: "Drinks",
      items: [
        {
          item_name: "Drinks 1",
          count: 13,
          id: 10
        },
        {
          item_name: "Drinks 2",
          count: 23,
          id: 11
        }
      ]
    },

    {
      category_name: "Desserts",
      items: [
        {
          item_name: "Dessert 1",
          count: 14,
          id: 12
        },
        {
          item_name: "Dessert 2",
          count: 24,
          id: 13
        },
        {
          item_name: "Dessert 3",
          count: 34,
          id: 14
        },
        {
          item_name: "Dessert 4",
          count: 44,
          id: 15
        }
      ]
    }
  ]


  ngOnInit() {
    this.service.getFood().subscribe(
      (res) => {
        if (res) {
          this.mainContent = res as any;
        }
        console.log(res);
      }
    );
    this.timer.subscribe(tick => {
      this.service.updateCount().subscribe((resp) => {
        if(resp) {
          console.log("Count Api response : ", resp)
          this.updateMainContentCount(resp);
        }
      }) });
  }

  updateMainContentCount(resp) {
    for(var i = 0; i < this.mainContent.length; i++) {
      for(var j = 0; j < this.mainContent[i].items.length; j++) {
        this.mainContent[i].items[j].count = resp[this.mainContent[i].items[j].id];

      }
    }
  }

  sellItem(count, id) {
    this.service.sellFoodItem(id, count).subscribe((resp) => {
      if(resp && resp == true) {
        console.log("Sold Success");
        this.toastr.success('Sold Successfully', 'Sold!', {
          timeOut : 1500,
          progressBar : true,
          closeButton	:true
        });
      }
      else {
        console.log("Unable to sell");
        this.toastr.error("Item out of stock!", "Error!", {
          timeOut : 3000
        });
      }
    })
    
    setTimeout(() => {
      }, 2000);
    
  }
}
