let { form } = document.forms
let inputs = Object.values(form)
let sizes = [false, false, false]

let label = document.querySelectorAll('label')

let modal = document.querySelector('.figure_style'),
    figureType = document.querySelector('.figure_style h4 span'),
    figureWidth = document.querySelector('.figure_style .width span'),
    figureHeight = document.querySelector('.figure_style .height span'),
    figureBg = document.querySelector('.figure_style .bg-color span')

class Figure{
    constructor(width, height, bgcolor){
        this.width = width
        this.height = height
        this.bgcolor = bgcolor
    }

    createElement(){
        let div = document.createElement('div')
        return div
    }

    style(element){
        element.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background-color: ${this.bgcolor};
        `
        return element
    }

    render(){
        let element = this.createElement()
        this.style(element)
        document.querySelector('#figure').append(element)
    }
}

class Rectangle extends Figure{
    style(element){
        element.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background-color: ${this.bgcolor};
        `
        return element
    }
}
class Triangle extends Figure{
    style(element){
        element.style.cssText = `
        width: 0;
        height: 0;
        border: 0 solid transparent;
        border-left-width: ${this.width / 2}px;
        border-right-width: ${this.width / 2}px;
        border-bottom: ${this.height}px solid ${this.bgcolor};
        `
        return element
    }
}
class Circle extends Figure{
    style(element){
        element.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background-color: ${this.bgcolor};
        border-radius: 100%;
        `
        return element
    }
}

function getSize(){
    inputs.forEach((input, index) => {
        if(input.name != 'button'){
            if(!sizes.includes(false)){
                form.style.display = 'none'
                modal.style.display = 'block'
                figureType.textContent = inputs[2].value
                figureWidth.textContent = inputs[1].value
                figureHeight.textContent = inputs[0].value
                figureBg.textContent = inputs[3].value
                createFigure()
            }
            else{
                if(input.value == '' || input.value == 'none'){
                    sizes[index] = false
                    label[index].style.color = 'red'
                }else{
                    sizes[index] = true
                    label[index].style.color = 'white'
                }
            }
        }
    })
}

inputs.forEach(input => {
    if(input.name == "button"){
        input.addEventListener('click', (e) => {
            e.preventDefault()
            getSize()
        })
    }
})

function createFigure(){
    if(inputs[2].value == 'rectangle'){
        let figure = new Rectangle(inputs[1].value, inputs[0].value, inputs[3].value)
        figure.render()
    }else if(inputs[2].value == 'triangle'){
        let figure = new Triangle(inputs[1].value, inputs[0].value, inputs[3].value)
        figure.render()
        console.log(figure);
    }else if(inputs[2].value == 'circle'){
        let figure = new Circle(inputs[1].value, inputs[0].value, inputs[3].value)
        figure.render()
    }
}