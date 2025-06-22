import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { toPng, toJpeg, toSvg } from 'html-to-image';

export enum ExportType {
  PNG = 'png',
  JPEG = 'jpeg',
  SVG = 'svg',
}

@Component({
  selector: 'ng-signature-pad, [ngSignaturePad]',
  templateUrl: './signature-pad-angular.component.html',
  styleUrls: ['./signature-pad-angular.component.scss'],
})
export class SignaturePadAngularComponent implements AfterViewInit, OnDestroy {
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;
  private resizeObserver!: ResizeObserver;
  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private isDrawing = false;
  ExportType = ExportType;
  @Input() lineSize = 3;
  hasSignature = false;
  private mouseX = 0;
  private mouseY = 0;

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setCanvasSize();
    this.initListeners();
    this.clearCanvas();

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });

    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  setLineStyle() {
    this.ctx.lineWidth = this.lineSize;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';
  }

  initListeners() {
    this.canvas.addEventListener('mousedown', this.mouseDownEvent);
    this.canvas.addEventListener('mousemove', this.mouseMoveEvent);
    this.canvas.addEventListener('mouseup', this.mouseUpEvent);
    this.canvas.addEventListener('touchstart', this.touchStartEvent);
    this.canvas.addEventListener('touchmove', this.touchMoveEvent);
    this.canvas.addEventListener('touchend', this.touchEndEvent);
  }

  removeListeners() {
    this.canvas.removeEventListener('mousedown', this.mouseDownEvent);
    this.canvas.removeEventListener('mousemove', this.mouseMoveEvent);
    this.canvas.removeEventListener('mouseup', this.mouseUpEvent);
    this.canvas.removeEventListener('touchstart', this.touchStartEvent);
    this.canvas.removeEventListener('touchmove', this.touchMoveEvent);
    this.canvas.removeEventListener('touchend', this.touchEndEvent);
  }

  mouseDownEvent = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.isDrawing = true;
    this.mouseX = (e.clientX - rect.left) * scaleX;
    this.mouseY = (e.clientY - rect.top) * scaleY;

    this.ctx.beginPath();
    this.setLineStyle();
    this.ctx.moveTo(this.mouseX, this.mouseY);
  };

  mouseMoveEvent = (e: MouseEvent) => {
    if (!this.isDrawing) return;
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  };

  mouseUpEvent = () => {
    this.isDrawing = false;
    this.hasSignature = true;
  };

  touchStartEvent = (e: TouchEvent) => {
    e.preventDefault();
    this.isDrawing = true;
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = touch.clientX - rect.left;
    this.mouseY = touch.clientY - rect.top;
    this.ctx.beginPath();
    this.setLineStyle();
    this.ctx.moveTo(this.mouseX, this.mouseY);
  };

  touchMoveEvent = (e: TouchEvent) => {
    if (!this.isDrawing) return;
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  };

  touchEndEvent = () => {
    this.isDrawing = false;
    this.hasSignature = true;
  };

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.removeListeners();
    this.mouseX = 0;
    this.mouseY = 0;
    this.isDrawing = false;
    this.hasSignature = false;
  }

  private setCanvasSize(): void {
    const container = this.containerRef.nativeElement;
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.setCanvasSize();
    this.ctx.putImageData(imageData, 0, 0);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'transparent';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.hasSignature = false;
  }

  reset() {
    this.clearCanvas();
    this.containerRef.nativeElement.style.backgroundColor = '#ffffff';
  }

  downloadCanvas(type: ExportType) {
    let req$ = this.exportPNG();
    if (type === ExportType.JPEG) {
      req$ = this.exportJPG();
    }
    if (type === ExportType.SVG) {
      req$ = this.exportSVG();
    }
    req$
      .then(dataUrl => {
        this.downloadSignature(dataUrl, type);
      })
      .catch(err => {
        console.error('oops, something went wrong!', err);
      });
  }

  exportPNG(): Promise<string> {
    return toPng(this.containerRef.nativeElement, { cacheBust: true });
  }

  exportJPG(): Promise<string> {
    return toJpeg(this.containerRef.nativeElement);
  }

  exportSVG(): Promise<string> {
    return toSvg(this.containerRef.nativeElement);
  }

  downloadSignature(dataUrl: string, extension: 'png' | 'jpeg' | 'svg') {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'signature.' + extension;
    link.click();
  }

  setBackground() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.containerRef.nativeElement.style.backgroundColor = randomColor;
  }
}
