# gamecontrol
Example for custom property binding, event binding and view encapsulation

To build in local
- install node.js and npm
- npm install -g @angular/cli
- ng new <<yourprojectname>>
- ng g c <<yourcomponentname>>
- npm install --save bootstrap //In angular-cli.json add ../node_modules/bootstrap/dist/css/bootstarp.min.css in styles
- ng serve

Excercise: 
==========
Create three new components: gamecontrol,odd,even
GameControl Component should have buttons to start and stop the game
When starting the game an event holding the increement number should be emitted for every second
The event should be listenable from outside the component
On Stopping the game, no more events should get emitted
A new Odd component should be created for every odd number emitted (same with EvenComponent for even number)
Output Odd number,even number in your components


Property and event binding can be used on
=========================================

HTML elements - Native Properties and Events 
<button class = "btn btn-primary" [disabled]="!addNewServer" (click)="onCreateServer()">Add Server</button>

Directives    - Native/Custom Properties and Events
<p [ngStyle] = "{ backgroundColor:getColor() }">Server status is online</p>

Components    - Custom Properties and Events
<app-server *ngFor = "let serverElement of serverElements"
  [server] = "serverElement">
</app-server>


@Input decorator (Ability to make your properties bindable from outside the parent component using this component)
================
-Used to recieve data into a component
@Input decorator tells Angular that this property is public and available for binding by a parent component

@Input() decorator exposes the property to the world and any parent component(<app-servers-list>) hosting component with @Input decorator property (<app-server>) 
i.e. implementing it through its selector will be able to apply this to its property

The properties of a component or directive are hidden from binding by default. They are private from an Angular binding perspective. 
When adorned with the @Input decorator, the property becomes public from an Angular binding perspective. Only then can it be bound by some other component or directive.

server.component.ts
-----------------------------
export class ServerComponent {
 @Input()                                              //for alias @Input('srvElement')
 server:{ type: string, name:string,content:string};
}

server.component.html
----------------------
<div class="panel panel-default">
    <div class="panel-heading">
        {{server.name}}
    </div>
    <div class="panel-body">
        <p>
            <strong *ngIf = "server.type==='Server'" style="color:limegreen">{{server.content}}</strong>
            <em *ngIf = "server.type==='blueprint'" style="color:blue">{{server.content}}</em>
         </p>
    </div>
</div>

servers-list.component.html 
----------------------
<app-server
  *ngFor = "let serverElement of serverElements"
  [server] = "serverElement">                         //with Alias [srvElement] = "serverElement"
</app-server>

We are sending each array element from serverElements as an input to server.

servers-list.component.ts
------------------------
 export class ServersComponent implements OnInit {
  
  serverElements = [
	  {type:'Server', name: 'Test Server', content: 'Just a test server..'},
	  {type:'Second Server', name: 'Test Server', content: 'Second test server..'}];
	  constructor() { }
	  ....
  }

In this example, each array element in serverElements is binded to server property in Servers Component and hence Servers Component is able to read and display value from ServersList Component.

ServersList (passes the values) -> server Component (receives the input)

When it appears in the template expression to the right of the equals (=), it belongs to the template's component and does not require the @Input decorator.

When it appears in square brackets ([ ]) to the left of the equals (=), the property belongs to some other component or directive; 
that property must be adorned with the @Input decorator.

Alias: once alias is set for input property, other components can bind only using alias not the property's original name


@Output Decorator Allow Parent component using this component to listen to your own events which you create with new EventEmitter
=================
-Inform Parent component (which implements child component) of the changes in the Child component. Parent listens to the event
-Child Emits an event. 
Eg: when a server is added using Cockpit Component, the new server needs to be pushed to serversList array in ServersList Component.
So, the event of adding a server has to be emitted to ServerList Component

-Event Emitter is an object in the Angualar Framework which allows you to emit your own events

serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
onAddServer() {
    this.serverCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
    });

-we should listen to this event in component implementing it

<app-cockpit 
    (serverCreated) = onServerAdded($event)
    (bpCreated) = onBlueprintAdded($event)></app-cockpit>
	

onServerAdded(serverData:{serverName:string, serverContent:string}) {
    this.serverElements.push({
      type: 'Server',
      name:serverData.serverName,
      content:serverData.serverContent
    });
  }

Cockpit (emits event of adding new server) ---> ServersList (listens to the event)


cockpit - where we enter name,content and click the button //not involved in this example for Input property binding
Server- component for individual server
ServersList - contains list of serverElements to be used by cockpit


hint: use custom event binding or property binding in the hosting component (component in which the child component selector is used) 
wherever implementing component's selector is used


View Encapsulation
===================
1) ViewEncapsulation.Emulated 
- default behaviour
- Emulates Native scoping of styles
- Enforces style encapsulation by adding unique attribute to each element in a component such as _ngcontent-ejo-1, 
  due to which css defined in the component will get applied to only elements in that specific component.
- This behaviour can be overwritten by adding following to @Component decorator
2) encapsulation: ViewEncapsulation.None  
- This will not encapsulate that component and hence do not add any unique selectors to components. 
  Therefore, Styles added to component.css in this case will be applied "Globally"
3) encapsulation: ViewEncapsulation.Native
- Uses the shadow DOM technology. Gives the same result as "Emulated" which is default but only in browsers which support it.

==================
DOM
==================
The Document Object Model (DOM) is a programming interface for HTML, XML and SVG documents. It provides a structured representation of the document as a tree. 
The DOM defines methods that allow access to the tree, so that they can change the document structure, style and content. 
The DOM provides a representation of the document as a structured group of nodes and objects, possessing various properties and methods.
Nodes can also have event handlers attached to them, 
and once an event is triggered, the event handlers get executed. Essentially, it connects web pages to scripts or programming languages.

https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
================
Shadow DOM

https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/
Shadow DOM refers to the ability of the browser to include a subtree of DOM elements into the rendering of a document, but not into the main document DOM tree. 

https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM


	